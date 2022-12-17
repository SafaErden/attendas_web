import { ReactNode } from 'react'

interface ISimpleDataProps {
	heading: string
	data: ReactNode
	maxContent?: boolean
}

export const SimpleData = ({ heading, data, maxContent = false }: ISimpleDataProps) => {
	return (
		<div className='flex flex-col gap-2'>
			<span style={{ maxWidth: maxContent ? 'max-content' : '200px' }} className='text-gray-500 font-medium'>
				{heading}
			</span>
			<span style={{ maxWidth: maxContent ? 'max-content' : '200px' }} className='text-gray-900 font-medium'>
				{data}
			</span>
		</div>
	)
}
