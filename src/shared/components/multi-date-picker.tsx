/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectorIcon, XIcon } from '@heroicons/react/outline'
import { Picker } from './date-picker'
import dayjs from 'dayjs'
import { Field } from 'formik'

interface IFormPickerProps {
	name: string
	label?: string
	classNames?: string
	format?: string
}

export const FormMultiDatePicker = ({ name, label, classNames, format = 'MM/DD/YYYY' }: IFormPickerProps) => {
	const handlePickerChange =
		(setFieldValue: any, setFieldTouched: any, field: any) => (_date: any, dateString: string) => {
			setFieldValue(name, [...(field.value ?? []), dateString])
			setFieldTouched(name)
		}

	const handleDateDelete = (setFieldValue: any, setFieldTouched: any, field: any, ind: number) => () => {
		setFieldValue(
			name,
			(field.value ?? []).filter((val: string, index: number) => index !== ind),
		)
		setFieldTouched(name)
	}

	return (
		<Field name={name}>
			{({ field, meta, form }: any) => {
				const hasError = meta.touched && !!meta.error && !field?.value && !field?.value?.length
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
								value={null}
								format={format}
								onChange={handlePickerChange(form.setFieldValue, form.setFieldTouched, field)}
								style={{ width: '100%' }}
							/>
						</div>
						<div className='flex gap-1 flex-wrap'>
							{field?.value?.map((date: string, ind: number) => (
								<div
									className='relative rounded-full text-xs font-medium p-3 bg-primary-hover text-white flex gap-2 items-center justify-center'
									key={`${date}-${ind}`}
								>
									{date ? dayjs(date).format('MM/DD/YYYY') : '-'}
									<div
										onClick={handleDateDelete(form.setFieldValue, form.setFieldTouched, field, ind)}
										className='cursor-pointer leading-3'
									>
										<XIcon className='w-3 h-3' />
									</div>
								</div>
							))}
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
