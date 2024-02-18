---
layout: '../../layouts/BlogBaseLayout.astro'
title: 'Vue3响应式原理2'
---

# (更)完善的响应式系统

## 从Set到WeakMap
在上一节，我们已经实现了一个简单的响应式系统：将一个`obj`对象和副作用函数关联。但是它还是不够完善，导致问题的原因是**我们没有能够将副作用函数和操作的目标字段之间建立联系**。不管我们访问`obj`的哪个属性，我们都将`effect`副作用函数添加到了bucket内。因此我们需要从` obj <=> effectFns ` 转换到` obj <=> fileds <=> effectFns `。因此，我们可以使用WeakMap来实现这样的映射。

```javascript
// bucket using WeakMap
const bucket = new WeakMap();
const obj = new Proxy(data, {
    get(target, key) {
        if (!activeEffect) {
            return target[key];
        }

        let depsMap = bucket.get(target);
        if (!depsMap) {
            depsMap = new Map();
            bucket.set(target, depsMap);
        }

        let deps = depsMap.get(key);
        if (!deps) {
            deps = new Set();
            depsMap.set(key, deps);
        }

        deps.add(activeEffect);
        return target[key];
    },

    set(target, key, newVal) {
        target[key] = newVal;
        const depsMap = bucket.get(target);
        if (!depsMap) {
            return;
        }
        const deps = depsMap.get(key);
        deps && deps.forEach((fn) => fn());
    }
});
```
这样，我们就从单纯的代理一个对象转换到代理对象的字段，实现了更加精细的控制和更好的性能。
现在，我们将跟踪副作用函数的逻辑直接存放到了代理内的get函数内，更好的做法是将这段逻辑重新封装到一个track函数中，同理的还有触发的逻辑。
```javascript
    function track(target,key) {
        if(!activeEffect) return
        let depsMap = bucket.get(target);
        if(!depsMap) {
            bucket.set(target,(depsMap = new Map()));
        }
        let deps = depsMap.get(key);
        if(!deps) {
            depsMap.set(key,(deps = new Set()))l
        }
        deps.add(activeEffect);
    }

    function trigger(target,key) {
        const depsMap = bucket.get(target,key);
        if(!depsMap) return;
        const effect = depsMap.get(key);
        effect && effect.forEach((fn)=>fn());
    }
```

## 为什么使用WeakMap而不是Map？
如果你知道javascript内还有一个数据结构叫做Map的话你可能会产生疑问：为什么我们需要使用WeakMap而不是Map呢？这是一个好问题，WeakMap和Map都可以实现KV映射，但是WeakMap的引用是弱引用，而Map的引用是强引用。弱引用意味着WeakMap内的Key不会影响内存回收器的判断，其中储存的Obj可以被内存回收器正常回收而不会引发内溢出问题。因此，在这种情况下WeakMap是更好的选择。

