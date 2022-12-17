import { ReactNode } from 'react'

const weightClassNames = {
	light: 'font-light', // 300
	normal: 'font-normal', // 400
	medium: 'font-medium', // 500
	semiBold: 'font-semibold', // 600
	bold: 'font-bold', //700
}

const sizeClassNames = {
	xs: 'text-xs', // 12px
	sm: 'text-sm', // 14px
	md: 'texbase', // 16px
	lg: 'text-lg', // 18px
	xl: 'text-xl', // 20px
	xl2: 'text-2xl', // 24px
	xl3: 'text-3xl', // 30px
}

const colorClassNames = {
	normal: 'text-gray-900', // color: rgb(17 24 39);
	blue: 'text-blue-800', // color: rgb(30 64 175);
	lightGray: 'text-gray-500', // color: rgb(107 114 128);
	success: 'text-emerald-600', // color: rgb(5, 150, 105);
	warning: 'text-yellow-300', // color for: rgb(227, 192, 27);
	error: 'text-red-600', // color for: rgb(213, 18, 18);
	headingNormal: 'text-gray-700', // color for: rgb(55, 65, 81);
	white: 'text-white',
	black: 'text-black',
}

interface ITextProps {
	children: ReactNode
	weight?: keyof typeof weightClassNames
	size?: keyof typeof sizeClassNames
	color?: keyof typeof colorClassNames
	addedClasses?: string
}
export const Text = ({ children, weight = 'normal', size = 'sm', color = 'black', addedClasses = '' }: ITextProps) => {
	return (
		<span className={`${weightClassNames[weight]} ${sizeClassNames[size]} ${colorClassNames[color]} ${addedClasses}`}>
			{children}
		</span>
	)
}
