<template>
    <div id="container" class="bg-[rgba(255,255,255,0.4)]">
        <Transition>
            <div class="bg-[rgba(255,255,255)] absolute w-full h-full z-10 flex items-center justify-center rounded-md"
                v-if="loading">
                <span class="daisy-loading daisy-loading-ring w-40 bg-accent"></span>
            </div>
        </Transition>
        <div class="flex flex-col gap-2">
            <div class="daisy-stats  bg-[rgba(255,255,255,0.4)] ">
                <div class="daisy-stat">
                    <div class="daisy-stat-title">总贡献</div>
                    <div class="daisy-stat-value text-primary">{{ total }}</div>
                </div>
                <div class="daisy-stat bg-[rgba(255,255,255,0.4)]">
                    <div class="daisy-stat-title">月贡献</div>
                    <div class="daisy-stat-value text-secondary">{{ monthTotal }}</div>
                </div>
            </div>
            <div id="heat-map" class="heat-map"></div>
            <div id="heat-map-1" class="heat-map"></div>
            <div id="heat-map-2" class="heat-map"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, Transition } from 'vue';
import { SVG, extend as SVGextend, Element as SVGElement, Rect } from '@svgdotjs/svg.js';
const loading = ref(true);
const total = ref(0);
const monthTotal = ref(0);
onMounted(async () => {
    const baseURL = 'https://github-contributions-api.deno.dev/NenoSann.json';
    // I don't konw what the hell this is, but seems like the monthes and days are correct
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // the monthIndex in javascript is 0 index!
    const currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const currentDateFrom = new Date(currentYear, currentMonth, 2);

    // previous month
    const previousMonth1From = new Date(currentYear, currentMonth - 1, 2);
    const previousMonth1To = new Date(currentYear, currentMonth, 1);
    const preViousMonth1Days = new Date(currentYear, currentMonth, 0).getDate();

    // the month before previous month
    const previousMonth2From = new Date(currentYear, currentMonth - 2, 2);
    const previousMonth2To = new Date(currentYear, currentMonth - 1, 1);
    const preViousMonth2Days = new Date(currentYear, currentMonth - 1, 0).getDate();

    const currentMonthURL = `${baseURL}?from=${currentDateFrom.toISOString()}&to=${currentDate.toISOString()}&flat=true`;
    const previousMonth1URL = `${baseURL}?from=${previousMonth1From.toISOString()}&to=${previousMonth1To.toISOString()}&flat=true`;
    const previousMonth2URL = `${baseURL}?from=${previousMonth2From.toISOString()}&to=${previousMonth2To.toISOString()}&flat=true`;
    const currentMonthDataPromise = fetch(currentMonthURL).then((response) => response.json());
    const previousMonth1DataPromise = fetch(previousMonth1URL).then((response) => response.json());
    const previousMonth2DataPromise = fetch(previousMonth2URL).then((response) => response.json());

    const [currentMonthData, previousMonth1Data, previousMonth2Data] = await Promise.all([
        currentMonthDataPromise,
        previousMonth1DataPromise,
        previousMonth2DataPromise,
    ]);
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    total.value = currentMonthData.totalContributions + previousMonth1Data.totalContributions + previousMonth2Data.totalContributions;
    monthTotal.value = currentMonthData.totalContributions;
    arr = currentMonthData.contributions.map((day) => {
        return { 'color': day.color, 'counts': day.contributionCount, 'date': day.date };
    })
    arr2 = previousMonth1Data.contributions.map((day) => {
        return { 'color': day.color, 'counts': day.contributionCount, 'date': day.date };
    })
    arr3 = previousMonth2Data.contributions.map((day) => {
        return { 'color': day.color, 'counts': day.contributionCount, 'date': day.date };
    })
    const data_arr = [arr, arr2, arr3];
    const heatmaps = document.querySelectorAll('.heat-map');
    const days = [currentMonthDays, preViousMonth1Days, preViousMonth2Days];
    for (let index = 0; index < data_arr.length; index++) {
        for (let day = 0; day < days[index]; day++) {
            // create a new daisy-tooltip, and it contains a svg for github contributions
            const tooltip = document.createElement('div');
            tooltip.classList.add('daisy-tooltip'); // add daisy-ui tooltip class for the div, see:https://daisyui.com/components/tooltip/
            tooltip.setAttribute('data-tip', `${data_arr[index][day] ? `${data_arr[index][day].counts === 0 ? `${data_arr[index][day].date}没有contribution😳😳😳` : `${data_arr[index][day].date}有${data_arr[index][day]?.counts}个contribution! 🥳🥳🥳`}` :
                `这天还没到呢😅😅😅`}`) // set the tooltips message
            const newSVG = SVG().size('15px', '15px');
            newSVG.rect('15px', '15px').attr({ fill: data_arr[index][day] ? data_arr[index][day].color : '#ebedf0', rx: '2px' });
            tooltip.appendChild(newSVG.node); // append svg to tooltip
            heatmaps[index].appendChild(tooltip); // append tooltip to heatmaps
        }
    }
    loading.value = false;
})

</script>

<style scoped>
#container {
    @apply relative;
    @apply w-full;
    @apply flex flex-col items-center justify-center gap-4;
    @apply mx-auto py-[20px];
    @apply rounded-lg shadow-lg;
    @apply portrait:w-full;
    transition: all 0.3s ease;
}

.heat-map {
    @apply grid grid-cols-11 grid-rows-3 gap-1;
    @apply w-[205px];
    @apply h-[53px];
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>