import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string, ref } from 'yup'
import { IVerifyEmailData } from '../login'

export const verifyEmailInitialValues: IVerifyEmailData = {
	email: '',
	password: '',
	confirmPassword: '',
}

const { valid_email } = ERROR_MESSAGES

export const verifyEmailValidationSchema = object({
	email: string().nullable().required(ERROR_MESSAGES.required('email', true)).email(valid_email()),
	password: string()
		.nullable()
		.required(ERROR_MESSAGES.required('password', true))
		.min(6, ERROR_MESSAGES.min(6, 'Password')),
	confirmPassword: string()
		.nullable()
		.oneOf([ref('password'), null], 'Passwords must match'),
})
