import { CheckIcon, XIcon } from '@heroicons/react/outline'

const bgColors = {
	success: 'rgba(5, 150, 105, 0.25)',
	error: 'rgba(213, 18, 18, 0.18)',
	warning: 'rgba(227, 192, 27, 0.4)',
	gray: 'rgba(176, 176, 176, 0.18)',
}

interface IComplianceIconProps {
	type?: keyof typeof bgColors
}

export const ComplianceIcon = ({ type = 'success' }: IComplianceIconProps) => {
	return (
		<div
			style={{ width: '24px', height: '24px', backgroundColor: bgColors[type] }}
			className='flex items-center justify-center rounded-full'
		>
			{type === 'success' && <CheckIcon className='w-4 h-4 text-emerald-600' />}
			{type === 'warning' && <span style={{ color: 'rgb(227, 192, 27)' }}>!</span>}
			{type === 'error' && <XIcon className='w-4 h-4 text-red-600' />}
			{type === 'gray' && <span style={{ color: 'color: rgb(156, 156, 156)' }}>?</span>}
		</div>
	)
}
