/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'
import { ReactNode } from 'react'

interface IFormInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	helperText?: string
	defaultValue?: string
	label?: string
	minWidth?: string
	Icon?: ReactNode
	maxWidth?: string
}

export const FormInput = ({
	name,
	placeholder,
	type,
	id,
	label,
	defaultValue,
	helperText = '',
	minWidth = '240px',
	maxWidth = '100%',
	Icon,
	...inputProps
}: IFormInputProps) => {
	return (
		<Field name={name}>
			{({ field, meta }: any) => {
				const hasError = meta.touched && !!meta.error
				const errorMessage = hasError ? meta.error : ''

				return (
					<div style={{ minWidth }} className='flex flex-col gap-1'>
						<label htmlFor={id ?? ''} className='block text-sm font-medium text-gray-700'>
							{label}
						</label>
						{helperText && <span className='text-xs font-light text-slate-400 mb-1'>{helperText}</span>}

						<div style={{ maxWidth }} className='relative rounded-md shadow-sm bg-white'>
							<input
								{...field}
								type={type}
								name={name}
								id={id}
								className={`block w-full pr-10 ${
									hasError
										? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500 text-red-900'
										: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
								} focus:outline-none  sm:text-sm rounded-md disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500`}
								placeholder={placeholder}
								defaultValue={defaultValue}
								aria-invalid='true'
								{...inputProps}
							/>
							{!!Icon && (
								<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>{Icon}</div>
							)}
						</div>
						{hasError && (
							<p className='mt-2 text-sm text-red-600' id='email-error'>
								{errorMessage}
							</p>
						)}
					</div>
				)
			}}
		</Field>
	)
}
