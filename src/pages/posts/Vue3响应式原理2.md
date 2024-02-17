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