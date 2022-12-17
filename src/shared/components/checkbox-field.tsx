/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'

interface ICheckBoxFieldProps {
	name: string
	desc?: string
}

export const CheckboxField = ({ name, desc }: ICheckBoxFieldProps) => {
	return (
		<div>
			<fieldset>
				<div className='space-y-4'>
					<div className='flex h-5 items-center'>
						<Field
							name={name}
							type='checkbox'
							className='h-4 w-4 rounded border-gray-300 text-primary-main focus:ring-primary-main'
						/>
						<label className='ml-3 block text-sm font-medium text-gray-700'>{desc}</label>
					</div>
				</div>
			</fieldset>
		</div>
	)
}
