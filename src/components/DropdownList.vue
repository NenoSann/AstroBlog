<template>
    <div class="daisy-dropdown daisy-dropdown-end ">
        <label tabindex="0" class="daisy-btn daisy-btn-ghost text-lg">{{ title }}</label>
        <div tabindex="0" class="flex flex-col gap-2 p-2 shadow daisy-dropdown-content z-[1] bg-base-100 rounded-box w-64">
            <ThemeList v-for="item in list" :themeData=item></ThemeList>
        </div>
    </div>
</template>

<script setup>
import ThemeList from './ThemeList.vue'
import { useAttrs } from 'vue';
const props = defineProps({
    title: {
        type: String,
        defualt: 'Dropdown'
    },
    list: {
        type: Array,
        required: true
    }
})
const attrs = useAttrs()
</script>

<style lang="scss" scoped></style>