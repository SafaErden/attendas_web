/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IOption } from '@src/shared/types'
import dayjs from 'dayjs'
import { IAnyQuestions } from '../QOZBS/qozbs'
import { ICZIDInvestorRelationShip, ICZIDQOZBRelationShip, IQuestion } from './capzoneIds'

export const relationSubmitHandler = (
	questions: IQuestion[],
	values: Partial<ICZIDInvestorRelationShip> | Partial<ICZIDQOZBRelationShip>,
) => {
	const copyQuestions: IQuestion[] = JSON.parse(JSON.stringify(questions))

	Object.keys(values).forEach((key) => {
		const valueKey = key as keyof ICZIDInvestorRelationShip
		const foundQuestion = copyQuestions.find((q) => q.name === valueKey)
		if (foundQuestion) {
			if (foundQuestion.type === 'ifYes') {
				// @ts-ignore
				if (values[valueKey]?.value === '1' && foundQuestion.options) {
					foundQuestion.options[1].value = 'true'
					// @ts-ignore
					foundQuestion.values[2].value = values[`${valueKey}Amount`] ? `${values[`${valueKey}Amount`]}` : undefined
				} else if (foundQuestion.options) {
					foundQuestion.options[0].value = 'false'
				}
			} else if (foundQuestion.type === 'yesNo') {
				// @ts-ignore
				values[valueKey]?.value === '1'
					? (foundQuestion.values[2].value = 'true')
					: (foundQuestion.values[2].value = 'false')
			} else if (foundQuestion.type === 'date') {
				// @ts-ignore
				foundQuestion.values[2].value = values[valueKey]?.value
					? // @ts-ignore
					  dayjs(values[valueKey]?.value).format('YYYY-MM-DD')
					: undefined
			} else if (foundQuestion.type === 'multiChoice') {
				// @ts-ignore
				values[valueKey]?.value.forEach((item) => {
					foundQuestion.options?.forEach((opt) => {
						if (opt.id === item) {
							opt.value = opt.id
						}
					})
				})
			} else {
				// @ts-ignore
				foundQuestion.values[2].value = values[valueKey]?.value ? `${values[valueKey]?.value}` : undefined
			}

			// @ts-ignore
			foundQuestion.values[0].value = values[valueKey]?.additionalNotes ?? undefined
			// @ts-ignore
			foundQuestion.values[1].value = values[valueKey]?.recommendation ?? undefined
		}
	})

	return copyQuestions
}

export const newRelationSubmitHandler = (questions: IQuestion[]) => {
	return questions
		.filter((qst) => {
			const ifYesValueInd = qst.values.findIndex((value) => value.id === 'ifYesValue')

			const valueInd = qst.values.findIndex((value) => value.id === 'value')

			return (
				!!qst.values[ifYesValueInd]?.value ||
				!!(
					(qst.values[valueInd].value || qst.values[valueInd].value === 0) &&
					`${qst.values[valueInd].value}`.length > 0
				) ||
				!!(qst.values[valueInd].multiValue && !!qst.values[valueInd].multiValue?.length) ||
				qst.values.some((val) => (val.id === 'recommendation' || val.id === 'additionalNotes') && !!val.value)
			)
		})
		.map((question) => {
			const newQuestion: IQuestion = { ...JSON.parse(JSON.stringify(question)), ifYesValue: undefined }
			const valueInd = newQuestion.values.findIndex((value) => value.id === 'value')
			const ifYesValueInd = newQuestion.values.findIndex((value) => value.id === 'ifYesValue')

			if (newQuestion.options) {
				newQuestion.options = newQuestion.options.map((opt) => {
					const option: IOption = JSON.parse(JSON.stringify(opt))

					if (option.question) {
						const nestedQuestion = option.question
						const optValueInd = nestedQuestion.values.findIndex((v) => v.id === 'value')
						const optionIfYesValueInd = nestedQuestion.values.findIndex((v) => v.id === 'ifYesValue')

						if (nestedQuestion.type === 'yesNo') {
							if (nestedQuestion.values[optValueInd].value) {
								nestedQuestion.values[optValueInd].value =
									nestedQuestion.values[optValueInd].value === '1' ? 'true' : 'false'
							}
							if (opt.id !== newQuestion.values[valueInd].value) {
								nestedQuestion.values[optValueInd].value = undefined
							}
						}

						if (nestedQuestion.type === 'singleChoice') {
							if (opt.id !== newQuestion.values[valueInd].value) {
								console.log('clearrrrrr')
								nestedQuestion.values[optValueInd].value = undefined
							}
						}

						if (
							nestedQuestion.type === 'number' ||
							nestedQuestion.type === 'numberMoney' ||
							nestedQuestion.type === 'numberPercent'
						) {
							if (nestedQuestion.values[optValueInd].value || nestedQuestion.values[optValueInd].value === 0) {
								nestedQuestion.values[optValueInd].value = `${nestedQuestion.values[optValueInd].value}`

								if (opt.id !== newQuestion.values[valueInd].value) {
									nestedQuestion.values[optValueInd].value = undefined
								}
							}
						}

						if (nestedQuestion.type === 'ifYes' && nestedQuestion.options) {
							if (nestedQuestion.values[optValueInd].value) {
								nestedQuestion.values[optValueInd].value =
									nestedQuestion.values[optValueInd].value === '1' ? 'true' : 'false'
								nestedQuestion.values[optionIfYesValueInd].value =
									nestedQuestion.values[optionIfYesValueInd].value ||
									nestedQuestion.values[optionIfYesValueInd].value === 0
										? `${nestedQuestion.values[optionIfYesValueInd].value}`
										: undefined

								if (opt.id !== newQuestion.values[valueInd].value) {
									nestedQuestion.values[optValueInd].value = undefined
									nestedQuestion.values[optionIfYesValueInd].value = undefined
								}
							}
						}

						if (nestedQuestion.type === 'multiChoice') {
							if (
								nestedQuestion.values[optValueInd].value &&
								Array.isArray(nestedQuestion.values[optValueInd].value) &&
								nestedQuestion.values[optValueInd].value.length > 0
							) {
								const selections = nestedQuestion.values[optValueInd].value as string[]
								nestedQuestion.values[optValueInd].value = undefined
								selections.forEach((item) => {
									nestedQuestion.options?.forEach((opt) => {
										if (opt.id === item) {
											opt.value = opt.id
										}
									})
								})
							} else {
								nestedQuestion.values[optValueInd].value = undefined
							}
							if (opt.id !== newQuestion.values[valueInd].value) {
								nestedQuestion.values[optValueInd].value = undefined
							}
						}

						if (nestedQuestion.type === 'date') {
							if (nestedQuestion.values[optValueInd].value) {
								nestedQuestion.values[optValueInd].value = dayjs(nestedQuestion.values[optValueInd].value).format(
									'YYYY-MM-DD',
								)
							}

							if (opt.id !== newQuestion.values[valueInd].value) {
								nestedQuestion.values[optValueInd].value = undefined
							}
						}

						if (nestedQuestion.type === 'multiValue') {
							if (
								nestedQuestion.values[optValueInd].multiValue &&
								nestedQuestion.values[optValueInd].multiValue?.length
							) {
								nestedQuestion.values[optValueInd].multiValue = nestedQuestion.values[optValueInd].multiValue?.map(
									(dateString) => dayjs(dateString).format('YYYY-MM-DD'),
								)
							} else {
								nestedQuestion.values[optValueInd].multiValue = undefined
							}

							if (opt.id !== newQuestion.values[valueInd].value) {
								nestedQuestion.values[optValueInd].multiValue = undefined
							}
						}
					}

					return option
				})
			}

			if (newQuestion.type === 'yesNo') {
				if (newQuestion.values[valueInd].value) {
					newQuestion.values[valueInd].value = newQuestion.values[valueInd].value === '1' ? 'true' : 'false'
				}

				return newQuestion
			}

			if (newQuestion.type === 'number' || newQuestion.type === 'numberMoney' || newQuestion.type === 'numberPercent') {
				if (newQuestion.values[valueInd].value || newQuestion.values[valueInd].value === 0) {
					newQuestion.values[valueInd].value = `${newQuestion.values[valueInd].value}`
				}

				return newQuestion
			}

			if (newQuestion.type === 'ifYes' && newQuestion.options) {
				if (newQuestion.values[valueInd].value) {
					newQuestion.values[valueInd].value = newQuestion.values[valueInd].value === '1' ? 'true' : 'false'
					newQuestion.values[ifYesValueInd].value =
						newQuestion.values[ifYesValueInd].value || newQuestion.values[ifYesValueInd].value === 0
							? `${newQuestion.values[ifYesValueInd].value}`
							: undefined
				}

				return newQuestion
			}

			if (newQuestion.type === 'multiChoice') {
				if (
					newQuestion.values[valueInd].value &&
					Array.isArray(newQuestion.values[valueInd].value) &&
					newQuestion.values[valueInd].value.length > 0
				) {
					const selections = newQuestion.values[valueInd].value as string[]
					newQuestion.values[valueInd].value = undefined
					selections.forEach((item) => {
						newQuestion.options?.forEach((opt) => {
							if (opt.id === item) {
								opt.value = opt.id
							}
						})
					})
				} else {
					newQuestion.values[valueInd].value = undefined
				}

				return newQuestion
			}

			if (newQuestion.type === 'date') {
				if (newQuestion.values[valueInd].value) {
					newQuestion.values[valueInd].value = dayjs(newQuestion.values[valueInd].value).format('YYYY-MM-DD')
				}

				return newQuestion
			}

			if (newQuestion.type === 'multiValue') {
				if (newQuestion.values[valueInd].multiValue && newQuestion.values[valueInd].multiValue?.length) {
					newQuestion.values[valueInd].multiValue = newQuestion.values[valueInd].multiValue?.map((dateString) =>
						dayjs(dateString).format('YYYY-MM-DD'),
					)
				} else {
					newQuestion.values[valueInd].multiValue = undefined
				}

				return newQuestion
			}

			return newQuestion
		})
}

export const createInitialValuesFromRelation = (relation: IQuestion[], objectId?: string): IAnyQuestions => {
	const answers = relation.map((rel) => {
		const relation: IQuestion = JSON.parse(JSON.stringify(rel))
		const valueInd = relation.values.findIndex((value) => value.id === 'value')
		if (relation.type === 'yesNo' || relation.type === 'ifYes') {
			if (relation.values[valueInd ?? 0].value) {
				relation.values[valueInd ?? 0].value = relation.values[valueInd ?? 0].value === 'true' ? '1' : '0'
			}
		} else if (relation.type === 'multiChoice') {
			relation.values[valueInd ?? 0].value = relation?.options
				?.filter((opt) => !!opt.value)
				.map((option) => option.value)
		}

		if (relation.options) {
			relation.options = relation.options?.map((opt) => {
				const option: IOption = JSON.parse(JSON.stringify(opt))
				if (option.question) {
					const nestedQuestion = option.question
					const optValueInd = nestedQuestion?.values.findIndex((value) => value.id === 'value')

					if (nestedQuestion.type === 'yesNo' || nestedQuestion.type === 'ifYes') {
						if (nestedQuestion.values[optValueInd ?? 0].value) {
							nestedQuestion.values[optValueInd ?? 0].value =
								nestedQuestion.values[optValueInd ?? 0].value === 'true' ? '1' : '0'
						}
					} else if (nestedQuestion.type === 'multiChoice') {
						nestedQuestion.values[optValueInd ?? 0].value = nestedQuestion?.options
							?.filter((opt) => !!opt.value)
							.map((option) => option.value)
					}
				}

				return option
			})
		}

		return relation
	})

	return { answers, ...(objectId ? { assetId: objectId } : {}) }
}
