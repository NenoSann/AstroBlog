---
layout: '../../layouts/BlogBaseLayout.astro'
title: 'Vue3响应式原理1'
---

# 什么是响应式系统？如何实现一个响应式系统？

## 副作用-SideEffect
在开始前我们需要简单介绍下什么是副作用。副作用是一个函数式编程概念，一个函数如果在运行的时候改变了它外部的状态，我们就说这个函数产生了副作用。

```javascript
    let val = 1;

    function effect() {
        // this will cause side-effect
        val = 2;
    }
```
我们将能够产生副作用的函数称为副作用函数。

## 响应式是什么
简单地说，我们有一个数据，我们也有一个节点。我们可以将数据显示在节点上。  
```javascript
    const data = {
        count:0
    }
    const app = document.querySeletor('#app');
    function effect() {
        app.innerText = data.count;
    }
    effect();
```
这样我们就创建了一个一次性的数据流，将data和app绑定在了一起。但是，当我们更改了`data`时，`app`的数据并不会神奇地一起更改。你需要在更新`data`的同时更改`app`。  

```javascript
    data.count = 2;
    // you need to re-call this, or app will not change
    effect();
```
我们希望做到当`data`更新的时候，副作用函数`effect`也能够自动地重新执行，不需要我们手动执行，来创建一个持续的数据流，这就是响应式数据。

## 实现一个(简单/简陋)响应式系统
让我们想想在整个数据变化过程中发生了什么。
- 副作用函数`effect`执行的时候，会触发`data.count`的读取
- 修改data.count的时候，会触发data.count的设置

如果我们可以拦截一个对象的读取和设置，并且将副作用函数储存起来，我们就可以做到对象发生改变的时候“通知”副作用函数重新执行。在ES6之前，我们只能使用Object.defineProperty函数实现，这也是Vue2所使用的方法。在ES6后，我们可以使用代理对象Proxy来实现。

```javascript
    // create bucket to store side-effect function
    const bucket = new Set();
    const data = {count:0};
    const obj = new Proxy(data,{
        get(target,key) {
            // store the side-effect function
            bucket.add(effect);
            return target[key];
        },
        set(target,key,newVal) {
            target[key] = newVal;
            // call all side-effect functions in the bucket
            bucket.forEach((fn)=>fn());
            return true;
        }
    })
```

不错，现在我们可以实现副作用函数在读取代理对象的时候将副作用函数添加到bucket内，同时在代理对象更新的时候通知副作用函数重新运行。但是目前的缺陷是我们通过硬编码的方式将effect作为副作用函数加入，如果副作用函数不叫做effect我们的响应式系统就失效了，因此我们希望不管什么函数，哪怕是匿名函数，都能够正确地收集到bucket内。

## 实现注册机制处理匿名函数
我们可以考虑创建一个机制，来注册副作用函数。例如，我们可以使用一个全局变量来存储被注册的副作用函数。

```javascript
    // global variable that store the side-effect function
    let activeEffect;
    function effect(fn) {
        activeEffect = fn;
        fn();
    }
```

首先我们定义了一个全局变量activeEffect，一个注册函数effect，我们可以通过下面的方法来使用effect函数：

```javascript
    effect(()=>app.innerText = obj.count);
```

同时，我们将响应式的代码进行简单修改:

```javascript
    const obj = new Proxy(data, {
    get(target, key) {
        // store the new activeEffect
        if(activeEffect) { 
            bucket.add(activeEffect);
        }
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        bucket.forEach((fn) => fn());
        return true;
    }
})
``` 

很棒，现在我们的响应系统就不依赖副作用函数的名字了，即使是匿名函数我们也能使其重新运行。

## 哪里出了问题？
如果我们对系统进行测试，例如在响应数据obj上增加一个不存在的属性的时候：

```javascript
    effect(()=>{
        // will log twice
        console.log('takes effect');
        app.innerText = obj.count;
    })

    setTimeout(()=>{
        obj.notExist = 'Your sys sucks!';
    },2000);
```
我们可以在控制台看到两个log信息，说明副作用函数在obj.notExist更新的时候也重新运行了。这并不是我们想要的，因为副作用函数只依赖于obj.count，obj.notExist并没有和副作用函数建立联系。这是因为bucket内的副作用函数只和obj本身关联，而没有精细到字段。下一篇我们将实现副作用函数和目标的明确联系。
