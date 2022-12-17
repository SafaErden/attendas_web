/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormTextAreaInput } from '../../shared/components/formTextAreaInput'
import { ReactNode, useState } from 'react'
import { OneColumnRow } from '../../shared/components/one-column-row'
import { PencilAltIcon } from '@heroicons/react/outline'
import { Text } from '../../shared/components/text'
import { Button } from '../../shared/components/button'
import { IQuestion } from './capzoneIds'

interface IRowWithNoteProps {
	name: string
	children: ReactNode
	values?: IQuestion['values']
}

interface IRowWithNoteButtonsProps {
	name: string
	note?: string
	rec?: string
	onSubmit: any
	values?: IQuestion['values']
}

export const RowWithNote = ({ name, children }: IRowWithNoteProps) => {
	return (
		<div className='flex flex-col md:flex-row gap-5'>
			<div className='flex-1'>{children}</div>

			<div className='flex flex-1 flex-col md:flex-row gap-2 md:gap-5'>
				<OneColumnRow>
					<FormTextAreaInput
						useOptionalText
						name={`${name}.recommendation`}
						label='Recommendation'
						rows={4}
						cols={25}
					/>
				</OneColumnRow>

				<OneColumnRow>
					<FormTextAreaInput
						useOptionalText
						name={`${name}.additionalNotes`}
						label='Additional Notes'
						rows={4}
						cols={25}
					/>
				</OneColumnRow>
			</div>
		</div>
	)
}

export const RowWithNoteButtons = ({ name, note, rec, onSubmit }: IRowWithNoteButtonsProps) => {
	const [noteOpen, setNoteOpen] = useState(false)
	const [recOpen, setRecOpen] = useState(false)
	return (
		<>
			<div className='flex-1'>
				{note ? (
					<Text size='xs'>{note}</Text>
				) : !noteOpen ? (
					<div
						onClick={() => {
							setNoteOpen(true)
						}}
						className='flex gap-2 items-center cursor-pointer'
					>
						<PencilAltIcon className='w-3 h-3 text-blue-800' />
						<Text size='xs' color='blue'>
							Add Note
						</Text>
					</div>
				) : (
					<OneColumnRow>
						<div className='flex flex-col gap-2'>
							<FormTextAreaInput name={`${name}.additionalNotes`} rows={4} cols={25} />
							<div className='flex justify-center gap-2'>
								<Button
									onClick={() => {
										onSubmit()
										setNoteOpen(false)
									}}
									kind='primary'
									size='xSmall'
								>
									Save
								</Button>
								<Button onClick={() => setNoteOpen(false)} kind='transparent' size='xSmall'>
									Cancel
								</Button>
							</div>
						</div>
					</OneColumnRow>
				)}
			</div>

			<div className='flex-1'>
				{rec ? (
					<Text size='xs'>{rec}</Text>
				) : !recOpen ? (
					<div
						onClick={() => {
							setRecOpen(true)
						}}
						className='flex gap-2 items-center cursor-pointer'
					>
						<PencilAltIcon className='w-3 h-3 text-blue-800' />
						<Text size='xs' color='blue'>
							Add Recommendation
						</Text>
					</div>
				) : (
					<OneColumnRow>
						<div className='flex flex-col gap-2'>
							<FormTextAreaInput name={`${name}.recommendation`} rows={4} cols={25} />

							<div className='flex justify-center gap-2'>
								<Button
									onClick={() => {
										onSubmit()
										setRecOpen(false)
									}}
									kind='primary'
									size='xSmall'
								>
									Save
								</Button>
								<Button onClick={() => setRecOpen(false)} kind='transparent' size='xSmall'>
									Cancel
								</Button>
							</div>
						</div>
					</OneColumnRow>
				)}
			</div>
		</>
	)
}

export const NewRowWithNote = ({ name, children, values }: IRowWithNoteProps) => {
	const additionalParts = values?.filter((value) => value.id !== 'value' && value.id !== 'ifYesValue') ?? []
	const hasZeroAdditional = additionalParts.length === 0
	const hasOneAdditional = additionalParts.length === 1
	return (
		<div className='flex flex-col md:flex-row gap-3'>
			{values?.map((item, ind) => {
				if (item.id === 'value') {
					return children
				} else if (item.id === 'ifYesValue') {
					return undefined
				} else {
					return (
						<div key={item.id} className='flex-1'>
							<OneColumnRow>
								<FormTextAreaInput
									useOptionalText
									name={`${name}.values[${ind}].value`}
									label={item.name}
									rows={4}
									cols={25}
								/>
							</OneColumnRow>
						</div>
					)
				}
			})}
			{hasZeroAdditional && (
				<>
					<div className='flex-1' />
					<div className='flex-1' />
				</>
			)}
			{hasOneAdditional && <div className='flex-1' />}
		</div>
	)
}

export const NewRowWithNoteButtons = ({ name, onSubmit, values }: IRowWithNoteButtonsProps) => {
	const [noteOpen, setNoteOpen] = useState(false)
	const [recOpen, setRecOpen] = useState(false)
	const filteredValues = values?.filter((value) => value.id !== 'value' && value.id !== 'ifYesValue') ?? []
	const hasOneAdditional = filteredValues.length === 1
	const hasZeroAdditional = filteredValues.length === 0

	return (
		<>
			{filteredValues.map((item) => {
				const isRecommendation = item.id === 'recommendation'
				const ind = values?.findIndex((value) => value.id === item.id)
				return (
					<div key={item.name} className='flex-1'>
						{item.value ? (
							<Text size='xs'>{item.value}</Text>
						) : (isRecommendation ? !recOpen : !noteOpen) ? (
							<div
								onClick={() => {
									isRecommendation ? setRecOpen(true) : setNoteOpen(true)
								}}
								className='flex gap-2 items-center cursor-pointer'
							>
								<PencilAltIcon className='w-3 h-3 text-blue-800' />
								<Text size='xs' color='blue'>
									Add {isRecommendation ? 'Recomendation' : 'Note'}
								</Text>
							</div>
						) : (
							<OneColumnRow>
								<div className='flex flex-col gap-2'>
									<FormTextAreaInput name={`${name}.values[${ind}].value`} rows={4} cols={25} />
									<div className='flex justify-center gap-2'>
										<Button
											onClick={() => {
												onSubmit()
												isRecommendation ? setRecOpen(false) : setNoteOpen(false)
											}}
											kind='primary'
											size='xSmall'
										>
											Save
										</Button>
										<Button
											onClick={() => {
												isRecommendation ? setRecOpen(false) : setNoteOpen(false)
											}}
											kind='transparent'
											size='xSmall'
										>
											Cancel
										</Button>
									</div>
								</div>
							</OneColumnRow>
						)}
					</div>
				)
			})}
			{hasOneAdditional && <div className='flex-1' />}
			{hasZeroAdditional && (
				<>
					<div className='flex-1' />
					<div className='flex-1' />
				</>
			)}
		</>
	)
}
