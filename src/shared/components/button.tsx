import { ReactNode } from 'react'

const MEASURE_CLASSES = {
	xSmall: 'px-2.5 py-1.5 text-xs',
	small: 'px-3 py-2 text-sm leading-4',
	medium: 'px-4 py-2 text-sm',
	large: 'px-4 py-2 text-base',
	xLarge: 'px-6 py-3 text-base',
	circularXs: 'p-1 rounded-full',
	circularSm: 'p-1.5 rounded-full',
	circularMd: 'p-2 rounded-full',
	circularLg: 'p-3 rounded-full',
}

export const KIND_CLASSES = {
	primary: 'bg-primary-main hover:bg-primary-hover border-transparent',
	gray: 'bg-gray-600 hover:bg-gray-700 border-transparent',
	grayLight: 'bg-gray-300 hover:bg-gray-700 border-transparent',
	secondary: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 border-transparent',
	white: 'text-gray-700 border-gray-300 hover:bg-gray-50',
	transparent: 'text-indigo-700 bg-none border-none hover:bg-indigo-200 shadow-none',
	delete: 'bg-red-200 text-red-700 hover:bg-red-300 border-transparent',
}

interface IButtonProps {
	children: ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset' | undefined
	kind?: keyof typeof KIND_CLASSES
	size?: keyof typeof MEASURE_CLASSES
	fullWidth?: boolean
	Icon?: ReactNode
	iconPosition?: string
	rounded?: boolean
}

export const Button = ({
	children,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClick = () => {},
	type = 'button',
	kind = 'primary',
	size = 'medium',
	fullWidth = false,
	Icon = null,
	iconPosition = 'end',
	rounded = false,
	...props
}: IButtonProps) => {
	const fullWidthClass = fullWidth ? 'w-full' : ''
	const roundedClass = rounded ? 'rounded-full' : ''
	return (
		<button
			onClick={onClick}
			type={type}
			className={`inline-flex items-center justify-center gap-2 border h-max ${fullWidthClass} ${MEASURE_CLASSES[size]} ${roundedClass} font-medium rounded-md shadow-sm text-white ${KIND_CLASSES[kind]} focus:outline-none focus:ring-2 focus:ring-offset-2`}
			{...props}
		>
			{iconPosition === 'start' && Icon}
			{children}
			{iconPosition === 'end' && Icon}
		</button>
	)
}
