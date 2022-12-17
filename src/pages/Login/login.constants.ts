import { object, string } from 'yup'
import { ERROR_MESSAGES } from '../../utils/error-messages'

export interface ILoginValues {
	username: string
	password: string
}

export const initialValues: ILoginValues = {
	username: '',
	password: '',
}

export const loginValidationSchema = object({
	username: string().nullable().required(ERROR_MESSAGES.required('username', true)),
	password: string()
		.nullable()
		.required(ERROR_MESSAGES.required('password', true))
		.min(6, ERROR_MESSAGES.min(6, 'Password')),
	// .matches(/^(?=.[A-Za-z])(?=.\d)(?=.[!@#$%^&-])[A-Za-z\d!@#$%^&*-]{9,}$/, {
	// 	excludeEmptyString: true,
	// 	message: ERROR_MESSAGES.passwordSignIn(),
	// }),
})
