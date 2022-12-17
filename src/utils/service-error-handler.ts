/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify'

export const errorHandlers = (res: any) => {
	if (res.data?.errors) {
		Object.values(res.data.errors).forEach((value: any) => {
			value.forEach((err: string) => {
				toast.error(err)
			})
		})
	} else if (Array.isArray(res.data)) {
		res.data.forEach((data: string) => {
			toast.error(data)
		})
	} else if (typeof res.data === 'string' && !!res.data && res.status !== 404) {
		toast.error(res.data)
	}
	// else {
	// 	toast.error('Server Error')
	// }
}
