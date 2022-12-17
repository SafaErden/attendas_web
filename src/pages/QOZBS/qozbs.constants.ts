import { object, string } from 'yup'
import { ERROR_MESSAGES } from '../../utils/error-messages'

export interface ILoginValues {
	email: string
	password: string
}

export const initialValues: ILoginValues = {
	email: '',
	password: '',
}

const { required, valid_email } = ERROR_MESSAGES

export const loginValidationSchema = object({
	email: string().nullable().required(required('email')).email(valid_email()),
	password: string().nullable().required(ERROR_MESSAGES.required('password')).min(6, ERROR_MESSAGES.min(6, 'Password')),
	// .matches(/^(?=.[A-Za-z])(?=.\d)(?=.[!@#$%^&-])[A-Za-z\d!@#$%^&*-]{9,}$/, {
	// 	excludeEmptyString: true,
	// 	message: ERROR_MESSAGES.passwordSignIn(),
	// }),
})
