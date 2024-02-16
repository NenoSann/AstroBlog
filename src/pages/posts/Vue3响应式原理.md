---
layout: '../../layouts/BlogBaseLayout.astro'
title: 'Vue3相应式原理'
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
这样我们就创建了一个一次性的数据流，将data和app绑定在了一起。但是，当我们更改了data时，app的数据并不会神奇地一起更改。你需要在更新data的同时更改app。
```javascript
    data.count = 2;
    // you need to re-call this, or app will not change
    effect();
```
我们希望做到当data更新的时候，副作用函数effect也能够自动地重新执行，不需要我们手动执行，来创建一个持续的数据流，这就是响应式数据。

## 实现一个(简单/简陋)响应式系统
让我们想想在整个数据变化过程中发生了什么。
- 副作用函数effect执行的时候，会触发data.count的读取
- 修改data.count的时候，我触发data.count的设置
如果我们可以拦截一个对象的读取和设置，并且将副作用函数储存起来，我们就可以做到对象发生改变的时候“通知”副作用函数重新执行。在ES6之前，我们只能