<template>
    <a :href="href" class=" block w-full">
        <div class="flex bg-[rgba(255,255,255,0.4)] rounded-md h-[20rem] w-full relative shadow-lg
                    before:bg-accent" id="main">
            <div class="flex-grow-0 min-w-fit h-[20rem]">
                <img :src="image_url" alt="" class="h-[20rem] w-auto ">
            </div>
            <div class="h-full flex flex-col items-center p-4 flex-grow">
                <h3>{{ title }}</h3>
                <p class="text-md text-ellipsis overflow-auto">{{ summary }}</p>
            </div>
        </div>
    </a>
</template>

<script setup>
const props = defineProps({
    image_url: String,
    summary: {
        type: String,
        default: 'Currently have not summary!',
        required: true
    },
    title: {
        type: String,
        default: '没有标题',
        required: true
    },
    href: {
        type: String,
        default: '/',
        required: true,
    }
})
</script>

<style scoped>
#main::before {
    transform: scaleX(0);
    transform-origin: bottom right;
}

#main:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
}

#main::before {
    @apply rounded-md;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    inset: 0 0 0 0;
    z-index: -1;
    transition: transform .4s ease;
}
</style>