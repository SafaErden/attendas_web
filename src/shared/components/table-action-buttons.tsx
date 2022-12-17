/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'

export const KIND_CLASSES = {
	edit: 'text-gray-900',
	details: 'text-gray-900',
	activate: 'text-green-700',
	deactivate: 'text-red-900',
	delete: 'text-red-600',
}

interface ITableButtonsProps {
	kind: keyof typeof KIND_CLASSES
	children: string
	onClick?: () => void
	Icon?: ReactNode
}

export const TableButtons = ({
	children,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClick = () => {},
	kind,
	Icon,
}: ITableButtonsProps) => {
	const handleClick = (e: any) => {
		e.stopPropagation()
		onClick()
	}
	return (
		<div
			style={{ width: '170px' }}
			className={`flex cursor-pointer items-center px-3 py-2 ${KIND_CLASSES[kind]}`}
			onClick={handleClick}
		>
			{Icon}
			<span className='ml-2'>{children}</span>
		</div>
	)
}
