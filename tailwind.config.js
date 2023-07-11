/**
 * @type {import('tailwindcss').Config}
 * */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xs: "357px",
			sm: "640px",
			md: "880px",
			lg: "1280px",
			xl: "1440px",
			"2xl": "1680px",
			"3xl": "1920px",
			"4xl": "2240px",
		},
		extend: {
			backgroundImage: {
				"gradient-afruna":
					"linear-gradient(135deg, #FFD3A5 0%, #FBDEC0 100%)",
				"gradient-sidebar":
					"linear-gradient(135.58deg, #FFFFFF -1.05%, #F4F5FF 100%)",
				"vendor-fixed-scroll":
					"linear-gradient(45deg, rgba(239,245,251,0.91) 2%,rgba(239,245,251,0.91) 22%,rgba(248,227,205,0.91) 70%,rgba(253,219,185,0.83) 92%,rgba(254,216,178,0.83) 99%)",
				"gradient-bob":
					"linear-gradient(45deg, rgba(252,237,237,0.23) 0%,rgba(239,245,250,0.29) 47%,rgba(239,245,250,0.23) 40%,rgba(239,245,250,0.25) 63%,rgba(252,237,237,0.23) 99%,rgba(239,245,250,0.29) 100%)",
				"gradient-set-store":
					"linear-gradient(45deg, rgba(183,236,247,0.97) 0%,rgba(183,236,247,0.98) 5%,rgba(183,236,247,0.98) 7%,rgba(168,229,248,1) 14%,rgba(89,191,255,1) 50%,rgba(89,191,255,1) 85%,rgba(89,191,255,1) 100%)",
				"gradient-whitishblue":
					"linear-gradient(to right bottom , #41d3ef 10%, #0D2FDD 70%)",
				"gradient-y-deepblue":
					"linear-gradient(to bottom , #41d3ef 3%, #0C1340 96%)",
				"gradient-bluebutton":
					"linear-gradient(180.37deg, #4A90ED 13.5%, #06AEEE 100%)",
				"gradient-deepBluebutton":
					"linear-gradient(180deg,  #130CCA 5%, #52E5E7 100%)",
				"auth-wall": "url(/src/assets/imgs/image 132.png)",
			},
			fontFamily: {
				sans: ["Lato", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				"afruna-opaque": "#FCF5FB9F",
				"afruna-base": "#3C3C3C",
				"afruna-blue": "#0C0E3B",
				"afruna-gold": "#FF9017",
				"afruna-gray": "#595858",
				"afruna-slate": "#F4F5FF",
			},
		},
	},
	plugins: [],
};
