import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object, string } from 'yup'
import { ICapzoneId } from '../capzoneIds'

export const initialValues = (capzoneId: ICapzoneId | null): Partial<ICapzoneId> => {
	return {
		capZoneId: capzoneId?.capZoneId ?? undefined,
		investorId: capzoneId?.investor?.investorId ?? '',
		fundId: capzoneId?.fund?.fundId ?? '',
		businessId: capzoneId?.business?.businessId ?? '',
		assignedTo: capzoneId?.assignedToUser?.userId ? `${capzoneId?.assignedToUser?.userId}` : '',
	}
}

export const capzoneIdValidatioSchema = object({
	investorId: string().nullable().required(ERROR_MESSAGES.required('name of the Investor', false, true, false)),
	fundId: string().nullable().required(ERROR_MESSAGES.required('name of the fund', false, true, false)),
	businessId: string().nullable().required(ERROR_MESSAGES.required('QOZB', false, true, false)),
	assignedTo: string().nullable().required(ERROR_MESSAGES.required('name of the assigned user', false, true, false)),
})
