/* eslint-disable @typescript-eslint/ban-ts-comment */
interface ITwoColumnRowProps {
	children: React.ReactNode
	minWidth?: string
	maxWidth?: string
}

export const TwoColumnRow = ({ children, minWidth = '240px', maxWidth = '504px' }: ITwoColumnRowProps) => {
	return (
		<div
			style={{ maxWidth }}
			className='flex w-100 flex-wrap gap-3 md:gap-0 direction-col md:direction-row justify-between'
		>
			{(children as React.ReactNode[])?.map((child, i) => (
				<div key={i} style={{ minWidth }}>
					{child}
				</div>
			))}
		</div>
	)
}
