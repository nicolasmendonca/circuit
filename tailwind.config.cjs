const colors = require('tailwindcss/colors');
const daisyui = require('daisyui');

const primary = colors.purple;

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary
			}
		}
	},

	plugins: [daisyui],
	daisyui: {}
};

module.exports = config;
