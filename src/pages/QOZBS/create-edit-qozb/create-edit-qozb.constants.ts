import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'
import { IBussinesType, IQOZB, IQozbLocation } from '../qozbs'
import { IQuestion } from '@src/pages/CapzoneIds/capzoneIds'
import { createInitialValuesFromRelation } from '../../../pages/CapzoneIds/relation-submit-handler'

export const initialValues = (
	qozb: IQOZB | null,
	locations: IQozbLocation[],
	qozbTypes: IBussinesType[],
	qozbsQuestions: IQuestion[],
): Partial<IQOZB> => {
	return {
		businessId: qozb?.businessId ?? undefined,
		businessTypeId: qozb?.businessTypeId ?? qozbTypes?.[0]?.businessTypeId ?? '',
		businessName: qozb?.businessName ?? '',
		doingBusinessAs: qozb?.doingBusinessAs ?? '',
		censusTract: qozb?.censusTract ?? '',
		taxId: qozb?.taxId ?? '',
		email: qozb?.email ?? '',
		phone: qozb?.phone ?? '',
		country: qozb?.country ?? 'United States',
		city: qozb?.city ?? '',
		street: qozb?.street ?? '',
		state: qozb?.state ?? locations?.[0]?.state ?? '',
		zipCode: qozb?.zipCode ?? '',
		ozLocated: qozb?.ozLocated ? '1' : '0',
		...(qozbsQuestions ? createInitialValuesFromRelation(qozbsQuestions) : {}),
	}
}

export const qozbValidatioSchema = object({
	email: string().nullable().email(ERROR_MESSAGES.valid_email()),
	businessName: string().nullable().required(ERROR_MESSAGES.required('business name', false, true, false)),
	censusTract: string().nullable(),
	city: string().nullable(),
	street: string().nullable(),
	state: string().nullable(),
	zipCode: string().nullable(),
	phone: string().nullable(),
	country: string().nullable(),
	taxId: string().nullable(),
})
