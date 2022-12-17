import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string, ref } from 'yup'
import { IResetPasswordData } from '../login'

export const resetPasswordInitialValues: IResetPasswordData = {
	email: '',
	password: '',
	confirmPassword: '',
}

export const verifyEmailValidationSchema = object({
	email: string().nullable().required(ERROR_MESSAGES.required('email', true)).email(ERROR_MESSAGES.valid_email()),
	password: string()
		.nullable()
		.required(ERROR_MESSAGES.required('password', true))
		.min(6, ERROR_MESSAGES.min(6, 'Password')),
	confirmPassword: string()
		.nullable()
		.oneOf([ref('password'), null], 'Passwords must match'),
})
