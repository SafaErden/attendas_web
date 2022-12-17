import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'
import { IFund, IFundType, ILocation } from '../funds'
import { createInitialValuesFromRelation } from '../../../pages/CapzoneIds/relation-submit-handler'
import { IQuestion } from '@src/pages/CapzoneIds/capzoneIds'

export const initialValues = (
	fund: IFund | null,
	fundTypes: IFundType[],
	locations: ILocation[],
	fundsQuestions: IQuestion[],
): Partial<IFund> => {
	return {
		fundTypeId: fund?.fundTypeId ?? fundTypes?.[0]?.fundTypeId,
		fundId: fund?.fundId,
		fundName: fund?.fundName ?? '',
		employerId: fund?.employerId ?? '',
		city: fund?.city ?? '',
		street: fund?.street ?? '',
		state: fund?.state ?? locations?.[0]?.state ?? '',
		zipCode: fund?.zipCode ?? '',
		comments: fund?.comments ?? '',
		...(fundsQuestions ? createInitialValuesFromRelation(fundsQuestions) : {}),
	}
}

export const fundValidatioSchema = object({
	fundName: string().nullable().required(ERROR_MESSAGES.required('fund name')),
	employerId: string().nullable(),
	city: string().nullable(),
	street: string().nullable(),
	state: string().nullable(),
	zipCode: string().nullable(),
})
