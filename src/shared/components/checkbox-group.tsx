/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'

interface ICheckBoxGroupProps {
	options: {
		name: string
		id: string | number
	}[]
	name: string
	label: string
}

export const CheckboxGroup = ({ options, name, label }: ICheckBoxGroupProps) => {
	return (
		<Field name={name}>
			{({ field, form }: any) => {
				return (
					<div>
						<label className='text-sm font-bold text-gray-700'>{label}</label>
						<fieldset className='mt-4'>
							<div className='space-y-4'>
								{options.map((opt) => (
									<div key={opt.id} className='flex h-5 items-center'>
										<input
											{...field}
											onChange={() => {
												if (field.value?.includes(opt.id)) {
													form.setFieldValue(
														name,
														field.value.filter((v: string) => v !== opt.id),
													)
												} else {
													form.setFieldValue(name, [...(field.value ?? []), opt.id])
												}
											}}
											id={opt.id}
											value={opt.id}
											type='checkbox'
											checked={field.value?.includes(opt.id)}
											className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
										/>
										<label htmlFor={`${opt.id}`} className='ml-3 block text-sm font-medium text-gray-700'>
											{opt.name}
										</label>
									</div>
								))}
							</div>
						</fieldset>
					</div>
				)
			}}
		</Field>
	)
}
