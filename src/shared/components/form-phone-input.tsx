/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'
import PhoneInput from 'react-phone-number-input/input'
import { Country } from 'react-phone-number-input'
interface IFormPhoneInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	helperText?: string
	defaultValue?: string
	label?: string
	country?: Country
}

export const FormPhoneInput = ({
	name,
	placeholder,
	id,
	label,
	helperText = '',
	country = 'US',
	...inputProps
}: IFormPhoneInputProps) => {
	return (
		<Field name={name}>
			{({ field, meta, form }: any) => {
				const hasError = meta.touched && !!meta.error
				const errorMessage = hasError ? meta.error : ''

				return (
					<div className='flex flex-col gap-1'>
						<label htmlFor={id ?? ''} className='block text-sm font-medium text-gray-700'>
							{label}
						</label>
						{helperText && <span className='text-xs font-light text-slate-400 mb-1'>{helperText}</span>}
						<div className='relative rounded-md shadow-sm'>
							<PhoneInput
								{...field}
								onChange={
									((value: any) => {
										form.setFieldValue(name, value)
									}) as any
								}
								value={field.value}
								country={country}
								inputProps
								id={id}
								className={`block w-full pr-10 ${
									hasError
										? 'border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500 text-red-900'
										: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
								} focus:outline-none  sm:text-sm rounded-md`}
								placeholder={placeholder}
								aria-invalid='true'
								{...inputProps}
							/>
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
