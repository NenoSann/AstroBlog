<template>
    <div class=" w-full flex  justify-evenly items-center">
        <div v-for="icon in IconArray" class=" w-8">
            <a :href="icon.ref">
                <img :src="icon.src">
            </a>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    IconArray: Array,
})
</script>
