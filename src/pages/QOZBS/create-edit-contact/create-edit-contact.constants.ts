import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'
import { parsePhone } from '../../../utils/parse-phone'
import { IContact } from '../../Funds/funds'

export const initialValues = (contact: Partial<IContact> | null): Partial<IContact> => {
	return {
		contactId: contact?.contactId || undefined,
		firstName: contact?.firstName || '',
		lastName: contact?.lastName || '',
		email: contact?.email || undefined,
		phone: contact?.phone ? parsePhone(contact?.phone) : undefined,
		contactRoleId: contact?.contactRole?.contactRoleId || undefined,
	}
}

export const contactValidationSchema = object({
	email: string().nullable().email(ERROR_MESSAGES.valid_email()),
	firstName: string().nullable().required(ERROR_MESSAGES.required('contacts first name')),
	lastName: string().nullable().required(ERROR_MESSAGES.required('contacts last name')),
	phone: string().nullable(),
})
