import { ENVIRONMENT } from '../'

export const LOCALS_SHOP_REQUEST_CONFIG: { headers: { 'Content-Type': string }; baseURL: string } = {
	baseURL: ENVIRONMENT.BASE_URI ?? '',
	headers: {
		'Content-Type': 'application/json',
	},
}

export const UPLOAD_MEDIA_CONFIG: { headers: { 'Content-Type': string }; baseURL: string } = {
	baseURL: ENVIRONMENT.BASE_URI ?? '',
	headers: {
		'Content-Type': 'multipart/form-data',
	},
}
