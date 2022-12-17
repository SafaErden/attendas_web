import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'
import { IUser } from '../users'
import { parsePhone } from '../../../utils/parse-phone'

export const initialValues = (user: IUser | null): Partial<IUser> => {
	return {
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		phone: user?.phone ? parsePhone(user?.phone) : '',
		roleId: user?.roleId || 1,
		userId: user?.userId || undefined,
	}
}

// export const phoneRegExp =
// 	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const userValidatioSchema = object({
	email: string()
		.nullable()
		.required(ERROR_MESSAGES.required('users email address'))
		.email(ERROR_MESSAGES.valid_email()),
	firstName: string().nullable().required(ERROR_MESSAGES.required('users first name')),
	lastName: string().nullable().required(ERROR_MESSAGES.required('users last name')),
	phone: string().nullable().required(ERROR_MESSAGES.required('users phone number')),
})
