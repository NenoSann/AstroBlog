import { SVG, extend as SVGextend, Element as SVGElement, Rect } from '@svgdotjs/svg.js';
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

arr = currentMonthData.contributions.map((day) => {
    return day.color;
})
arr2 = previousMonth1Data.contributions.map((day) => {
    return day.color;
})
arr3 = previousMonth2Data.contributions.map((day) => {
    return day.color;
})
// import { SVG, extend as SVGexted, Element as SVGElement,Rect } from '../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js';

for (let i = 0; i < 30; i++) {
    let newSVG = SVG().size('15px', '15px').addTo('#heat-map');
    newSVG.rect('15px', '15px').attr({ fill: arr[i] ? arr[i] : '#ebedf0', rx: '2px' });
}
for (let i = 0; i < 30; i++) {
    let newSVG = SVG().size('15px', '15px').addTo('#heat-map-1');
    newSVG.rect('15px', '15px').attr({ fill: arr2[i] ? arr2[i] : '#ebedf0', rx: '2px' });
}
for (let i = 0; i < 30; i++) {
    let newSVG = SVG().size('15px', '15px').addTo('#heat-map-2');
    newSVG.rect('15px', '15px').attr({ fill: arr3[i] ? arr3[i] : '#ebedf0', rx: '2px' });
}