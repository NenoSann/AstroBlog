<template>
    <!-- grid grid-cols-2 grid-rows-4 -->
    <div class="blog-list">
        <BlogCard v-for="Blog in BlogList" :image_url="Blog.image_url" :href="Blog.href" :title="Blog.title"
            :summary="Blog.summary"></BlogCard>
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

</script>

<style>
.blog-list {
    @apply grid grid-cols-1 grid-rows-4 gap-6 rounded-lg w-full mr-[calc(20rem+20px)] h-[150vh] overflow-auto;
    @apply lg:grid-cols-2;
    @apply 2xl:grid-cols-3;
}
</style>
