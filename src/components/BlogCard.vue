<template>
    <div class="flex w-1/3 bg-[rgba(255,255,255,0.4)] rounded-md overflow-hidden max-h-120">
        <div>
            <img :src="image_url" alt="" class=" flex-grow-0">
        </div>
        <div class=" flex-grow">
            something
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    image_url: String,
})
</script>

<style lang="scss" scoped></style>