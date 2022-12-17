/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from '@headlessui/react'
import { Field } from 'formik'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

interface IRadioWithBorderProps {
	options: {
		name: string
		description: string
		id: string
	}[]
	name: string
	label: string
}

export const RadioGroupWithBorder = ({ options, name, label }: IRadioWithBorderProps) => {
	return (
		<Field name={name}>
			{({ field, form }: any) => {
				return (
					<RadioGroup value={field.value} onChange={(val) => form.setFieldValue(name, val)}>
						<label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
						<div className='bg-white rounded-md -space-y-px'>
							{options.map((opt, optInd) => (
								<RadioGroup.Option
									key={opt.id}
									value={opt.id}
									className={({ checked }) =>
										classNames(
											optInd === 0 ? 'rounded-tl-md rounded-tr-md' : '',
											optInd === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
											checked ? 'bg-slate-200 border-indigo-200' : 'border-gray-200',
											'relative border p-4 flex cursor-pointer focus:outline-none',
										)
									}
								>
									{({ active, checked }) => (
										<>
											<span
												className={classNames(
													checked ? 'bg-primary-main border-transparent' : 'bg-white border-gray-300',
													active ? 'ring-2 ring-offset-2 ring-primary-main' : '',
													'h-4 w-4 mt-0.5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center',
												)}
												aria-hidden='true'
											>
												<span className='rounded-full bg-white w-1.5 h-1.5' />
											</span>
											<span className='ml-3 flex flex-col'>
												<RadioGroup.Label
													as='span'
													className={classNames(
														checked ? 'text-gray-900' : 'text-gray-900',
														'block text-sm font-medium',
													)}
												>
													{opt.name}
												</RadioGroup.Label>
												{opt.description && (
													<RadioGroup.Description
														as='span'
														className={classNames(checked ? 'text-gray-700' : 'text-gray-500', 'block text-sm')}
													>
														{opt.description}
													</RadioGroup.Description>
												)}
											</span>
										</>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				)
			}}
		</Field>
	)
}
