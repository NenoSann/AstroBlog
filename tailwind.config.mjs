/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '[data-theme="dracula"]'],
	// darkMode: 'class',
	theme: {
		extend: {
		},
	},
	plugins: [
		require('tailwindcss/nesting'),
		require('@tailwindcss/typography'),
		// add daisyui plugin
		// see https://daisyui.com/
		require("daisyui"),
	],
	daisyui: {
		themes: [
			"cupcake",
			"light",
			"synthwave",
			"dracula",
		],
		prefix: 'daisy-',
		base: false,
		darkTheme: false,
	}
}
