/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'

interface IFormSelectInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	helperText?: string
	defaultValue?: string
	label?: string
	options: {
		id: string | number
		name: string
	}[]
}

;<div className='flex-wrap flex items-center flex-row gap-2'>
	<label htmlFor='location' className='text-sm font-medium text-gray-700'>
		Role:{' '}
	</label>
</div>

export const FormSelectInput = ({
	name,
	placeholder,
	type,
	id,
	label,
	defaultValue,
	helperText = '',
	options,
	...inputProps
}: IFormSelectInputProps) => {
	return (
		<Field name={name}>
			{({ field, meta }: any) => {
				const hasError = meta.touched && !!meta.error
				const errorMessage = hasError ? meta.error : ''

				return (
					<div className='flex flex-col gap-1'>
						<label htmlFor={id ?? ''} className='block text-sm font-medium text-gray-700'>
							{label}
						</label>
						{helperText && <span className='text-xs font-light text-slate-400 mb-1'>{helperText}</span>}
						<div className='relative rounded-md shadow-sm'>
							<select
								{...field}
								type={type}
								name={name}
								id={id}
								className={`block w-full pr-10 ${
									hasError
										? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500 text-red-900'
										: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
								} focus:outline-none  sm:text-sm rounded-md`}
								placeholder={placeholder}
								defaultValue={defaultValue}
								aria-invalid='true'
								{...inputProps}
							>
								{options.map((opt) => (
									<option key={opt.id} value={opt.id}>
										{opt.name}
									</option>
								))}
							</select>
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
