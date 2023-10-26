<template>
    <a :href="href" class=" block w-full">
        <div class="flex bg-[rgba(255,255,255,0.4)] rounded-md overflow-hidden h-full w-full relative shadow
                    before:bg-primary-content" id="main">
            <div>
                <img :src="image_url" alt="" class=" flex-grow-0 h-full w-full">
            </div>
            <div class=" flex flex-col items-center flex-grow p-4">
                <h2>{{ title }}</h2>
                <p class="w-full text-lg">{{ summary }}</p>
            </div>
        </div>
    </a>
</template>

<script setup>
const props = defineProps({
    image_url: String,
    summary: {
        type: String,
        default: 'Currently have not summary!'
    },
    title: {
        type: String,
        default: '没有标题'
    },
    href: {
        type: String,
        default: '/'
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