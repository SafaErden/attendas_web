/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			flex: {
				2: '2 2 0%',
			},
		},
		colors: {
			...colors,
			primary: {
				main: 'rgb(8, 45, 85)',
				hover: 'rgba(8, 45, 85, 0.9)',
			},
			grayBg: '#d1d5db',
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
}
