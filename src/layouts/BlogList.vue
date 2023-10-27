<template>
    <!-- grid grid-cols-2 grid-rows-4 -->
    <div class="grid grid-cols-2 grid-rows-4 gap-6 rounded-lg w-full  mr-[calc(20rem+20px)] h-[150vh] overflow-scroll">
        <BlogCard v-for="Blog in BlogList" :image_url="Blog.image_url" :href="Blog.href" :title="Blog.title"></BlogCard>
    </div>
</template>

<script setup>
import BlogCard from '../components/BlogCard.vue';
const props = defineProps({
    BlogList: {
        type: Array,
        required: true,
        default: []
    }
})
// const BlogList = [{
//     image_url: 'src/assets/blog1.png',
//     title: '第一篇博客！',
//     href: 'posts/post_1'
// }, { image_url: 'src/assets/blog2.png' }, {
//     image_url: 'src/assets/blog1.png'
// }, { image_url: 'src/assets/blog2.png' }, {
//     image_url: 'src/assets/blog1.png'
// }, { image_url: 'src/assets/blog2.png' }, {
//     image_url: 'src/assets/blog1.png'
// }, { image_url: 'src/assets/blog2.png' },]

</script>
