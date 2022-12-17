/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'formik'
import { ReactNode } from 'react'
import { IOption } from '../types'

interface IRadioGroupProps {
	options: {
		name: string
		id: string | number
		options?: IOption<string | number>[]
	}[]
	name: string
	label: string
	isIfYes?: boolean
	YesComp?: ReactNode
	LinkComp?: ReactNode
}

export const RadioGroup = ({
	options,
	name,
	label,
	isIfYes = false,
	YesComp = null,
	LinkComp = null,
}: IRadioGroupProps) => {
	const renderOption = (
		opt: {
			name: string
			id: string | number
			options?: IOption<string | number>[]
		},
		field: any,
		isNested = false,
	) => {
		return (
			<div key={opt.id} className={`flex items-center ${isNested ? 'ml-7' : ''}`}>
				<input
					{...field}
					id={opt.id}
					name={name}
					value={opt.id}
					type='radio'
					checked={`${field.value}` === `${opt.id}`}
					className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
				/>
				<label htmlFor={`${opt.id}`} className='ml-3 block text-sm font-medium text-gray-700'>
					{isIfYes && opt.name === 'Yes' ? '' : opt.name}
				</label>
				{isIfYes && opt.name === 'Yes' && YesComp}
			</div>
		)
	}
	return (
		<Field name={name}>
			{({ field }: any) => {
				return (
					<div>
						<label className='text-sm font-bold text-gray-700'>{label}</label>
						<div className='mt-1'>{LinkComp}</div>
						<fieldset className='mt-4'>
							<div className='space-y-4'>
								{options.map((opt) => (
									<div key={opt.id} className='flex flex-col gap-2'>
										{renderOption(opt, field)}
										{opt.options?.map((nestedOpt) => renderOption(nestedOpt, field, true))}
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
