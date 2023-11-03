---
layout: '../../layouts/BlogBaseLayout.astro'
title: 'ES6中的Set和Map'
---
# ES6之Set/Map
## 什么是Set和Map?
Set和Map是ES6新增的两个数据结构，能够帮助我们更好地管理项目中的数据信息。简要的说Set类似于其他编程语言中的"集合"，Map类似于其他编程语言中的"字典"，但是在Javscript中对于数据的限制更少，例如在Java中不允许将不同类型的变量加入同一个Set中，但是Javscript可以。

## Set
Set类似于Javscript中的数组，但是在Set中不能包含相同的元素，我们一般称之为"集合"。  
我们可以使用new关键字来创建一个Set:
```javascript
    const set  = new Set(); //create a set!
```
增删查改操作：
```javascript
    const set = new Set();
    set.add(1).add(2).add('NenoSann'); //使用add来增加元素，set支持链式调用
    set.add(1); //set中并不会出现第二个'1'，因为set不会包含重复元素！
    set.delete('NenoSann'); //会返回一个boolean来指示删除是否完成
    set.has(2); //使用has来判断是否存在元素
```
值得注意的是，虽然set支持直接增加对象，但是在set中保存的是**对象地址**，如果直接存储对象字面值会出错
```javascript
    const set = new Set();
    set.add({val:1});
    set.has({val:1}); //返回的是false，因为两个对象的地址并不一致！
```
Set类型可以使用四种