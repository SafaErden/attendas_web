import { ReactNode } from 'react'

const sizeClassNames = {
	xl: 'text-xl', // 20px
	xl2: 'text-2xl', // 24px
	xl3: 'text-3xl', // 30px
	xl4: 'text-4xl', // 36px
	xl5: 'text-5xl', // 48px
	xl6: 'text-6xl', // 60px
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
	size?: keyof typeof sizeClassNames
	color?: keyof typeof colorClassNames
	addedClasses?: string
}
export const Heading = ({ children, size = 'xl2', color = 'black', addedClasses = '' }: ITextProps) => {
	return (
		<span className={`font-bold ${sizeClassNames[size]} ${colorClassNames[color]} ${addedClasses}`}>{children}</span>
	)
}
