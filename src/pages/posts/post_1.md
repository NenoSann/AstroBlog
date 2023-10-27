---
layout: '../../layouts/BlogBaseLayout.astro'
title: '我的第一篇博客文章'
pubDate: '2022-07-01'
description: '这是我 Astro 博客的第一篇文章。'
author: 'Astro 学习者'
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'The full Astro logo.'
tags: ["astro", "blogging", "learning in public"]
---
# Use to test heading next
## use to test heading nest
### use to test heading nest
``` javascript
<script setup>
const props = defineProps({
    themeData: {
        type: Object,
    }
})
const HTML = document.querySelector('html');
const changeTheme = function () {
    console.log('change active')
    HTML.setAttribute('data-theme', props.themeData.name);
}
</script>
```
