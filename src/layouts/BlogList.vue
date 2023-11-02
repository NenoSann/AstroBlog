<template>
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
    @apply grid grid-cols-1 gap-4;
    @apply sm:grid-cols-2 2xl:grid-cols-3;
    @apply w-3/4 portrait:w-full;
}
</style>