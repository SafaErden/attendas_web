/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'
import { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

interface IFormSelectInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	helperText?: string
	label?: string
	options: {
		id: string | number
		name: string
	}[]
	useName?: boolean
}

export const FormSearchableSelectInput = ({
	name,
	label,
	helperText = '',
	options,
	placeholder,
	useName = false,
}: IFormSelectInputProps) => {
	const [query, setQuery] = useState('')
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ')
	}

	const filteredOptions =
		query === ''
			? options
			: options.filter((opt) => {
					return opt.name.toLowerCase().includes(query.toLowerCase())
			  })

	return (
		<Field name={name}>
			{({ field, meta, form }: any) => {
				const hasError = meta.touched && !!meta.error
				const errorMessage = hasError ? meta.error : ''

				return (
					<div className='flex flex-col gap-1'>
						{helperText && <span className='text-xs font-light text-slate-400 mb-1'>{helperText}</span>}
						<Combobox
							as='div'
							value={field.value}
							onChange={(value: any) => form.setFieldValue(name, useName ? value?.name : value?.id)}
							nullable
						>
							<Combobox.Label className='block text-sm font-medium text-gray-700'>{label}</Combobox.Label>
							<div className='relative mt-1'>
								<Combobox.Input
									placeholder={placeholder}
									className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
									onChange={(event) => setQuery(event.target.value)}
									displayValue={(id: string) =>
										options?.find((opt) => (useName ? opt.name : opt.id) === id)?.name as string
									}
								/>
								<Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
									<SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</Combobox.Button>
								<Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
									{filteredOptions.length === 0 && query !== '' ? (
										<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>Nothing found.</div>
									) : (
										filteredOptions.map((opt) => (
											<Combobox.Option
												key={opt.id}
												value={opt}
												className={({ active }) =>
													classNames(
														'relative cursor-default select-none py-2 pl-8 pr-4',
														active ? 'bg-indigo-600 text-white' : 'text-gray-900',
													)
												}
											>
												{({ active }) => (
													<>
														<span
															className={classNames(
																'block truncate',
																field.value === (useName ? opt.name : opt.id) ? 'font-semibold' : '',
															)}
														>
															{opt.name}
														</span>

														{field.value === (useName ? opt.name : opt.id) && (
															<span
																className={classNames(
																	'absolute inset-y-0 left-0 flex items-center pl-1.5',
																	active ? 'text-white' : 'text-indigo-600',
																)}
															>
																<CheckIcon className='h-5 w-5' aria-hidden='true' />
															</span>
														)}
													</>
												)}
											</Combobox.Option>
										))
									)}
								</Combobox.Options>
							</div>
						</Combobox>

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
