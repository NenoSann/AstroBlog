<template>
    <div class="flex  daisy-btn daisy-btn-ghost w-full" @click="changeTheme">
        <span class="flex-grow text-lg">{{ themeData.name }}</span>
        <span class="flex gap-2 h-[60%]">
            <span class="pattern-1 w-3 min-h-[60%] rounded-3xl"></span>
            <span class="pattern-2 w-3 min-h-[60%] rounded-3xl"></span>
            <span class="pattern-3 w-3 min-h-[60%] rounded-3xl"></span>
            <span class="pattern-4 w-3 min-h-[60%] rounded-3xl"></span>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    themeData: {
        type: Object,
        required: true
    }
})
const HTML = document.querySelector('html');
const changeTheme = function () {
    console.log('change active')
    HTML.setAttribute('data-theme', props.themeData.name);
}
</script>

<style scoped>
.pattern-1 {
    background-color: v-bind(themeData.color[0]);
}

.pattern-2 {
    background-color: v-bind(themeData.color[1]);
}

.pattern-3 {
    background-color: v-bind(themeData.color[2]);
}

.pattern-4 {
    background-color: v-bind(themeData.color[3]);
}
</style>