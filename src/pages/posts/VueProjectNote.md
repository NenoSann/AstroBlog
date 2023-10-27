---
layout: '../../layouts/BlogBaseLayout.astro'
---
# VueRouter的原理以及应用  
## 单页面和传统跳转的区别
* 单页面： 单页面开发基于组件和路由配合，所有的页面都可以被视为组件，每个路径**映射**一个组件。*在单页中使用a标签跳转是不行的*，因为a标签跳转的是html页面。  
* 传统页面： 传统的页面开发可以使用a标签来控制跳转，但是刷新会整个刷新页面，体验不如单页。  
  
## Vue-Router路由模式
共有三种：
* Hash模式
* History模式
* abstract模式

### Hash模式
Hash模式是Vue-Router的默认模式，提现在URL上永远带着'#'，支持度高，甚至兼容低版本的IE。#号后面的改变不会引起也面对服务端的请求，不会重新加载页面。
### History模式
HTML5的history API提供了history.pushState和history.replaceState方法,但是浏览器支持情况不是很好,能够在不刷新网页的情况下改变URL.缺点是前端的URL必须和向服务器端发起的请求的URL一致,若服务端没有做路由处理则会404.
### abstract模式
针对没有浏览器环境的情况,Vue-Router会自己对环境校验而强制切换到abstract模式.

## 原理解析
### Hash模式原理
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hash 模式</title>
</head>
  <body>
    <div>
      <ul>
        <li><a href="#/page1">page1</a></li>
        <li><a href="#/page2">page2</a></li>
      </ul>
      <div id="route-view"></div>
    </div>
  <script type="text/javascript">
    // 下面为hash的路由实现方式
    // 第一次加载的时候，不会执行hashchange监听事件，默认执行一次
    window.addEventListener('DOMContentLoaded', Load)
    window.addEventListener('hashchange', HashChange)
    var routeView = null
    function Load() {
      routeView = document.getElementById('route-view')
      HashChange()
    }
    function HashChange() {
      console.log('location.hash', location.hash)
      switch(location.hash) {
      case '#/page1':
        routeView.innerHTML = 'page1'
        return
      case '#/page2':
        routeView.innerHTML = 'page2'
        return
      default:
        routeView.innerHTML = 'page1'
        return
      }
    }

  </script>
  </body>
</html>
```

### History模式原理
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>History 模式</title>
</head>
<body>
  <div>
    <ul>
      <li><a href="/page1">page1</a></li>
      <li><a href="/page2">page2</a></li>
    </ul>
    <div id="route-view"></div>
  </div>
  <script type="text/javascript">
    // 下面为history的路由实现方式
    window.addEventListener('DOMContentLoaded', Load)
    window.addEventListener('popstate', PopChange)
    var routeView = null
    function Load() {
      routeView = document.getElementById('route-view')
      PopChange()
      // 获取所有带 href 属性的 a 标签节点
      var aList = document.querySelectorAll('a[href]')
      // 遍历 a 标签节点数组，阻止默认事件，添加点击事件回调函数
      aList.forEach(aNode => aNode.addEventListener('click', function(e) {
        e.preventDefault() //阻止a标签的默认事件
        var href = aNode.getAttribute('href')
        //  手动修改浏览器的地址栏
        history.pushState(null, '', href)
        // 通过 history.pushState 手动修改地址栏，
        // popstate 是监听不到地址栏的变化，所以此处需要手动执行回调函数 PopChange
        PopChange()
      }))
    }
    function PopChange() {
      console.log('location', location)
      switch(location.pathname) {
      case '/page1':
        routeView.innerHTML = 'page1'
        return
      case '/page2':
        routeView.innerHTML = 'page2'
        return
      default:
        routeView.innerHTML = 'page1'
        return
      }
    }
  </script>
</body>
</html>
```

# Pinia使用
## 简介
Pinia可以说是Vuex5,而Vuex则是用于管理VUe应用跨组件共享数据的工具  
## 优势
Pinia提供了组合式API,可以很好地解构代码;同时Pinia的API更加简洁
## 对比Vuex 3.x/4.x
* 弃用了Mutation
* 更好的TypeScript支持,可以尽可能地利用TS类型推导
* 无需动态添加Store
* 不再有嵌套解构的模块
* 不再有可以命名的模块
## 同sessionStorage, localStorage的区别
Pinia的数据存储在浏览器内存,不刷新网页就会保持(是否会被Chrome的垃圾清理检测?)
sessionStorage用于保存同一个窗口或者标签页的数据,关闭了就会删除
localStorage是持久性存储,可以一直存在于本地,除非主动Clear或者重装浏览器
## 如何使用
主要通过ES6的export/import来进行全局的变量共享,向全局的App.vue和main.js导出变量和方法,通过import文件的方式来进行变量传递.但是要记得使用store = useStore(),store.count之类的方法来避免响应性失效;或者使用Pinia提供的storeToRefs方法解构




# 前端开发学到的
## 移动端适配
移动端适配可以使用lib-flexible自动转换html的根字体大小,同时可以使用postcss-pxtorem来自动将px转化为rem