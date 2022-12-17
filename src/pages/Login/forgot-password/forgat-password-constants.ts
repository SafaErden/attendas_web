import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'

export interface IForgotPasswordValues {
	email: string
}

export const initialValues: IForgotPasswordValues = {
	email: '',
}

const { valid_email } = ERROR_MESSAGES

export const forgotPasswordValidationSchema = object({
	email: string().nullable().required(ERROR_MESSAGES.required('email', true)).email(valid_email()),
})
