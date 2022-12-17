import './spinner.css'

const spinnerWidths = {
	small: 'w-6 h-6',
	medium: 'w-12 h-12',
	large: 'w-24 h-24',
}

interface ISpinnerProps {
	spin: boolean
	size: 'small' | 'medium' | 'large'
}

const Spinner = ({ spin, size = 'medium' }: ISpinnerProps) => {
	const spinnerWidthClass = spinnerWidths[size]
	if (spin) {
		return (
			<div className='absolute bg-white opacity-75 rounded-sm inset-0 flex items-center justify-center pointer-events-none '>
				<div className={`spinner bg-indig0-700 z-10 opacity-100 ${spinnerWidthClass}`} role='status' />
			</div>
		)
	} else return null
}

export default Spinner
