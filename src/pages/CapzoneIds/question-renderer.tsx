/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrencyDollarIcon } from '@heroicons/react/outline'
import { CheckboxGroup } from '../../shared/components/checkbox-group'
import { FormInput } from '../../shared/components/form-input'
import { RadioGroup } from '../../shared/components/radio-group'
import { IOption, IRelationValue } from '../../shared/types'
import { FormDatePicker } from '../../shared/components/form-date-picker'
import { OneColumnRow } from '../../shared/components/one-column-row'
import { ICZIDInvestorRelationShip, ICZIDQOZBRelationShip, IQuestion } from './capzoneIds'
import { NewRowWithNote, NewRowWithNoteButtons, RowWithNote, RowWithNoteButtons } from './row-with-notes'
import dayjs from 'dayjs'
import { Text } from '../../shared/components/text'
import { FormMultiDatePicker } from '../../shared/components/multi-date-picker'
import { ReactNode } from 'react'

export const questionRenderer = (
	question: IQuestion,
	values: Partial<ICZIDInvestorRelationShip> & Partial<ICZIDQOZBRelationShip>,
) => {
	switch (question.type) {
		case 'date':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<FormDatePicker classNames='w-72' name={`${question.name}.value`} label={question.label} />
					</OneColumnRow>
				</RowWithNote>
			)
		case 'yesNo':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<RadioGroup
							options={[
								{
									id: '1',
									name: 'Yes',
								},
								{
									id: '0',
									name: 'No',
								},
							]}
							name={`${question.name}.value`}
							label={question.label}
						/>
					</OneColumnRow>
				</RowWithNote>
			)
		case 'multiChoice':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<CheckboxGroup options={question?.options ?? []} name={`${question.name}.value`} label={question.label} />
					</OneColumnRow>
				</RowWithNote>
			)
		case 'numberMoney':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<FormInput
							type='number'
							maxWidth='240px'
							placeholder='Number'
							name={`${question.name}.value`}
							label={question.label}
							Icon={<CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />}
						/>
					</OneColumnRow>
				</RowWithNote>
			)
		case 'ifYes':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<RadioGroup
							isIfYes
							YesComp={
								<FormInput
									disabled={
										(values?.[question.name as keyof ICZIDInvestorRelationShip] as IRelationValue<any>)?.value === '0'
									}
									type='number'
									maxWidth='240px'
									placeholder='If Yes, specify amount'
									name={`${question.name}Amount`}
									Icon={<CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />}
								/>
							}
							options={[
								{
									id: '0',
									name: 'No',
								},
								{
									id: '1',
									name: 'Yes',
								},
							]}
							name={`${question.name}.value`}
							label={question.label}
						/>
					</OneColumnRow>
				</RowWithNote>
			)
		case 'numberPercent':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<FormInput
							type='number'
							maxWidth='240px'
							placeholder='Number'
							name={`${question.name}.value`}
							label={question.label}
							Icon='%'
						/>
					</OneColumnRow>
				</RowWithNote>
			)
		case 'number':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<FormInput
							type='number'
							maxWidth='240px'
							placeholder='Number'
							name={`${question.name}.value`}
							label={question.label}
						/>
					</OneColumnRow>
				</RowWithNote>
			)
		case 'singleChoice':
			return (
				<RowWithNote key={question.name} name={question.name}>
					<OneColumnRow maxWidth='504px'>
						<RadioGroup options={question?.options ?? []} name={`${question.name}.value`} label={question.label} />
					</OneColumnRow>
				</RowWithNote>
			)
		default:
			return null
	}
}

export const questionAndAnswersRenderer = (
	question: IQuestion,
	values: Partial<ICZIDInvestorRelationShip> & Partial<ICZIDQOZBRelationShip>,
	onSubmit: any,
) => {
	switch (question.type) {
		case 'date':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-b border-gray-200 items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{' '}
								{question.values[2].value ? dayjs(question.values[2].value).format('MM/DD/YYYY') : '-'}
							</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)

		case 'multiChoice':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question?.options
									?.filter((o) => !!o.value)
									.map((o) => o.name)
									.join(', ')}
							</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		case 'numberMoney':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>{question.values[2].value ? '$' + question.values[2].value : '-'}</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		case 'ifYes':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question?.options?.[1].value
									? `Yes ($${question.values[2].value ?? 0})`
									: question?.options?.[0].value === 'false'
									? 'No'
									: '-'}
							</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		case 'numberPercent':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>{question.values[2].value ? '%' + question.values[2].value : '-'}</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		case 'number':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>{question.values[2].value ? question.values[2].value : '-'}</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		case 'singleChoice':
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>{question.values[2].value || '-'}</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
		default:
			return (
				<div key={question.name} className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.values[2].value === 'true' ? 'Yes' : question.values[2].value === 'false' ? 'No' : '-'}
							</Text>
						</div>
					</div>

					<RowWithNoteButtons
						name={question.name}
						note={question.values[0].value}
						rec={question.values[1].value}
						onSubmit={onSubmit}
					/>
				</div>
			)
	}
}

/**
 *
 * @param question
 * @param questions
 * @param onSubmit
 * @returns Fully working form fields
 *
 * This is to make everything auto
 */
export const newQuestionRenderer = (
	question: IQuestion,
	index: number,
	values: IQuestion[],
	optionFormName = '',
	optionValueInd = 0,
	onLinkClick: any = undefined,
): ReactNode => {
	const valueInd = question.values.findIndex((value) => value.id === 'value')
	const ifYesValueInd = question.values.findIndex((value) => value.id === 'ifYesValue')

	switch (question.type) {
		case 'date':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<FormDatePicker
								classNames='w-72'
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'yesNo':
			return (
				<>
					<NewRowWithNote
						key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						values={question.values}
					>
						<div className='flex-2'>
							<OneColumnRow maxWidth='504px'>
								<RadioGroup
									LinkComp={
										question.name === 'LocatedInOZ' ? (
											<span onClick={onLinkClick} className='cursor-pointer text-blue-800'>
												Click here to check the QOZB&apos;s location
											</span>
										) : null
									}
									options={question.options as IOption[]}
									name={
										optionFormName && optionValueInd >= 0
											? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
											: `answers[${index}].values[${valueInd}].value`
									}
									label={question.label}
								/>
							</OneColumnRow>
						</div>
					</NewRowWithNote>
					{question?.options?.map((opt, ind) => {
						const shouldRenderQuestion = values?.[index]?.values?.[valueInd]?.value === opt.id
						const optionValueInd = opt.question?.values.findIndex((value) => value.id === 'value')

						return shouldRenderQuestion && opt.question
							? newQuestionRenderer(opt.question, index, values, `options[${ind}].question`, optionValueInd)
							: undefined
					})}
				</>
			)
		case 'multiChoice':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<CheckboxGroup
								options={question?.options ?? []}
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'numberMoney':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<FormInput
								type='number'
								maxWidth='240px'
								placeholder='Number'
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
								Icon={<CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'ifYes':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<RadioGroup
								isIfYes
								YesComp={
									<FormInput
										disabled={values?.[index]?.values?.[valueInd]?.value === '0'}
										type='number'
										maxWidth='240px'
										placeholder={question.values[ifYesValueInd]?.name}
										name={`answers[${index}].values[${ifYesValueInd}].value`}
										Icon={
											question.values[ifYesValueInd]?.type === 'textinput' ? (
												<CurrencyDollarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
											) : question.values[ifYesValueInd]?.type === 'percent' ? (
												'%'
											) : undefined
										}
									/>
								}
								options={question.options ?? []}
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'numberPercent':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<FormInput
								type='number'
								maxWidth='240px'
								placeholder='Number'
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
								Icon='%'
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'number':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<FormInput
								type='number'
								maxWidth='240px'
								placeholder='Number'
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
										: `answers[${index}].values[${valueInd}].value`
								}
								label={question.label}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		case 'singleChoice':
			return (
				<>
					<NewRowWithNote
						key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						values={question.values}
					>
						<div className='flex-2'>
							<OneColumnRow maxWidth='504px'>
								<RadioGroup
									options={question?.options ?? []}
									name={
										optionFormName && optionValueInd >= 0
											? `answers[${index}].${optionFormName}.values[${optionValueInd}].value`
											: `answers[${index}].values[${valueInd}].value`
									}
									label={question.label}
								/>
							</OneColumnRow>
						</div>
					</NewRowWithNote>
					{question?.options?.map((opt, ind) => {
						const shouldRenderQuestion = values?.[index]?.values?.[valueInd]?.value === opt.id
						const optionValueInd = opt.question?.values.findIndex((value) => value.id === 'value')

						return shouldRenderQuestion && opt.question
							? newQuestionRenderer(opt.question, index, values, `options[${ind}].question`, optionValueInd)
							: undefined
					})}
				</>
			)
		case 'multiValue':
			return (
				<NewRowWithNote
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					values={question.values}
				>
					<div className='flex-2'>
						<OneColumnRow maxWidth='504px'>
							<FormMultiDatePicker
								classNames='w-72'
								name={
									optionFormName && optionValueInd >= 0
										? `answers[${index}].${optionFormName}.values[${optionValueInd}].multiValue`
										: `answers[${index}].values[${valueInd}].multiValue`
								}
								label={question.label}
							/>
						</OneColumnRow>
					</div>
				</NewRowWithNote>
			)
		default:
			return null
	}
}

export const newQestionAndAnswersRenderer = (
	question: IQuestion,
	index: number,
	onSubmit: any,
	optionFormName = '',
) => {
	const valueInd = question.values.findIndex((value) => value.id === 'value')
	const ifYesValueInd = question.values.findIndex((value) => value.id === 'ifYesValue')
	switch (question.type) {
		case 'date':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-b border-gray-200 items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{' '}
								{question.values[valueInd ?? 0]?.value
									? dayjs(question.values[valueInd ?? 0]?.value).format('MM/DD/YYYY')
									: '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)

		case 'multiChoice':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question?.options
									?.filter((o) => !!o.value)
									.map((o) => o.name)
									.join(', ')}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'numberMoney':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.values[valueInd ?? 0]?.value ? '$' + question.values[valueInd ?? 0]?.value : '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'ifYes':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question?.values?.[valueInd].value === 'true'
									? `Yes ($${question?.values?.[ifYesValueInd]?.value || 0})`
									: question?.values?.[valueInd].value === 'false'
									? 'No'
									: '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'numberPercent':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.values[valueInd ?? 0]?.value ? '%' + question.values[valueInd ?? 0]?.value : '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'number':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.values[valueInd ?? 0]?.value ? question.values[valueInd ?? 0]?.value : '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'singleChoice':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.options?.find((o) => o.id === question.values[valueInd].value)?.name || '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		case 'multiValue':
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-b border-gray-200 items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<div className='flex gap-2 flex-wrap'>
								{question.values[valueInd ?? 0]?.multiValue
									? question.values[valueInd ?? 0]?.multiValue?.map((value) => {
											return (
												<Text key={value} weight='semiBold'>
													{dayjs(value).format('MM/DD/YYYY')}
												</Text>
											)
									  })
									: '-'}
							</div>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
		default:
			return (
				<div
					key={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
					className='flex flex-1 gap-2 border-gray-200 border-b items-center py-5'
				>
					<div className='flex-2'>
						<div className='flex flex-col gap-2 justify-center'>
							<Text>{question.label}</Text>
							<Text weight='semiBold'>
								{question.values[valueInd ?? 0]?.value === 'true'
									? 'Yes'
									: question.values[valueInd ?? 0]?.value === 'false'
									? 'No'
									: '-'}
							</Text>
						</div>
					</div>

					<NewRowWithNoteButtons
						name={optionFormName ? `answers[${index}].${optionFormName}` : `answers[${index}]`}
						onSubmit={onSubmit}
						values={question.values}
					/>
				</div>
			)
	}
}
