import { FC, ReactNode } from 'react'
import { Button } from './button'

interface ILayoutProps {
	name: ReactNode
	children: ReactNode
	buttonTitle?: string
	onButtonClick?: () => void
	Icon?: ReactNode
	showButton?: boolean
}

export const PageLayout: FC<ILayoutProps> = (props) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const { children, name, Icon, onButtonClick = () => {}, buttonTitle, showButton = true } = props
	return (
		<div className='py-6'>
			<div className='max-w-7xl mb-3 mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between'>
				<h1 className='text-2xl font-semibold text-gray-900'>{name}</h1>
				{showButton && (
					<Button size='small' iconPosition='start' Icon={Icon} onClick={onButtonClick}>
						{buttonTitle}
					</Button>
				)}
			</div>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>{children}</div>
		</div>
	)
}

export default PageLayout
