/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectorIcon } from '@heroicons/react/outline'
import { Picker } from './date-picker'
import dayjs from 'dayjs'
import { Field } from 'formik'

interface IFormPickerProps {
	name: string
	label?: string
	classNames?: string
	format?: string
}

export const FormDatePicker = ({ name, label, classNames, format = 'MM/DD/YYYY' }: IFormPickerProps) => {
	const handlePickerChange = (setFieldValue: any, setFieldTouched: any) => (_date: any, dateString: string) => {
		setFieldValue(name, dateString)
		setFieldTouched(name)
	}
	return (
		<Field name={name}>
			{({ field, meta, form }: any) => {
				const hasError = meta.touched && !!meta.error && !field.value
				const errorMessage = hasError ? meta.error : ''

				return (
					<div className={'flex flex-col gap-1'}>
						<label className={'block text-md font-bold text-gray-700'}>{label}</label>

						<div className={`${classNames}`}>
							<Picker
								onBlur={() => form.setFieldTouched(name)}
								suffixIcon={
									<div className='suffix-container'>
										<SelectorIcon />
									</div>
								}
								format={format}
								allowClear
								value={field?.value ? (dayjs(field.value) as any) : null}
								onChange={handlePickerChange(form.setFieldValue, form.setFieldTouched)}
								style={{ width: '100%' }}
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
