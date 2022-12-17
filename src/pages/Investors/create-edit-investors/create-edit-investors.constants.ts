import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string, boolean } from 'yup'
import { IInvestor, ILocation } from '../investors'

export const initialValues = (investor: IInvestor | null, locations: ILocation[]): Partial<IInvestor> => {
	return {
		investorId: investor?.investorId,
		company: investor?.company ?? false,
		companyName: investor?.companyName ?? '',
		firstName: investor?.firstName ?? '',
		lastName: investor?.lastName ?? '',
		email: investor?.email ?? '',
		phone: investor?.phone ?? '',
		city: investor?.city ?? '',
		street: investor?.street ?? '',
		country: investor?.country ?? 'United States',
		state: investor?.state ?? locations?.[0]?.state ?? '',
		zipCode: investor?.zipCode ?? '',
	}
}

export const investorValidatioSchema = object({
	company: boolean(),
	companyName: string()
		.nullable()
		.when('company', {
			is: true,
			then: string().required(ERROR_MESSAGES.required('investors company name')),
		}),
	firstName: string()
		.nullable()
		.when('company', {
			is: false,
			then: string().required(ERROR_MESSAGES.required('investors first name')),
		}),
	lastName: string()
		.nullable()
		.when('company', {
			is: false,
			then: string().required(ERROR_MESSAGES.required('investors last name')),
		}),
	email: string().nullable().email(ERROR_MESSAGES.valid_email()),
	phone: string().nullable(),
	city: string().nullable(),
	country: string().nullable(),
	street: string().nullable(),
	state: string().nullable(),
	zipCode: string().nullable(),
})
