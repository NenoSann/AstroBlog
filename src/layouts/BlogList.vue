<template>
    <div class="flex flex-col rounded-lg col-span-1 row-span-6 gap-6 basis-4/5 overflow-auto">
        <BlogCard v-for="Blog in BlogList" :image_url="Blog.image_url"></BlogCard>
    </div>
</template>

<script setup>
import BlogCard from '../components/BlogCard.vue';
const BlogList = [{
    image_url: 'src/assets/blog1.png'
}, { image_url: 'src/assets/blog2.png' }]

</script>
