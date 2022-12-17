/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, ReactNode } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { IOption } from '../types'

interface ISelectWithIconProps {
	value: string | number
	label?: string
	options: IOption<number>[]
	Icon: (opt?: IOption<number>) => ReactNode
	onChange: any
	minWidth?: string
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const SelectWithIcon = ({ options, label, value, onChange, Icon, minWidth = '200px' }: ISelectWithIconProps) => {
	return (
		<div style={{ minWidth }}>
			<Listbox value={value} onChange={onChange}>
				{({ open }) => (
					<>
						<Listbox.Label className='block text-sm font-medium text-gray-700'>{label}</Listbox.Label>
						<div className='mt-1 relative'>
							<Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
								<span className='flex items-center'>
									{Icon(options?.find((o) => o.id === value))}
									<span className='ml-3 block truncate'>{options?.find((o) => o.id === value)?.name}</span>
								</span>
								<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
									<ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave='transition ease-in duration-100'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
									{options.map((opt) => (
										<Listbox.Option
											key={opt.id}
											className={({ active }) =>
												classNames(
													active ? 'text-white bg-indigo-600' : 'text-gray-900',
													'cursor-default select-none relative py-2 pl-3 pr-9',
												)
											}
											value={opt.id}
										>
											{({ selected, active }) => (
												<>
													<div className='flex items-center'>
														{Icon(opt)}
														<span
															className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
														>
															{opt.name}
														</span>
													</div>

													{value === opt.id ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-indigo-600',
																'absolute inset-y-0 right-0 flex items-center pr-4',
															)}
														>
															<CheckIcon className='h-5 w-5' aria-hidden='true' />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	)
}
