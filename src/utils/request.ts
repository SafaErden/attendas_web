/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ENVIRONMENT } from '../config/index'
import { MAIN_ROUTES } from '../shared/route.enums'
import { getLocalStorage, removeFromLocalStorage } from '../utils/helper'
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Axios instance for create method to represent Core.URL specific works.
 *
 * * @type {AxiosInstance} request
 */
const request: AxiosInstance = axios.create({
	baseURL: ENVIRONMENT.BASE_URI,
	headers: {
		'Content-Type': 'application/json',
	},
})

const loginRoute = MAIN_ROUTES.LOGIN
const publicRoutes: string[] = [loginRoute]

// const { accessToken, refreshToken }: { accessToken: string; refreshToken: string } = getLocalStorage('user') ?? {
// 	accessToken: undefined,
// 	refreshToken: undefined,
// }

/**
 * Request Manager for Axios
 *
 * @type {(((req: AxiosRequestConfig) => AxiosRequestConfig) | ((error: unknown) => Promise<never>))[]}
 */
const requestManager: (((req: AxiosRequestConfig) => AxiosRequestConfig) | ((error: unknown) => Promise<never>))[] = [
	(req: AxiosRequestConfig): AxiosRequestConfig => {
		// @ts-ignore
		const token = getLocalStorage<{ accessToken: string }>('user')?.user
		if (token) {
			// @ts-ignore
			req.headers.common['Authorization'] = 'Bearer ' + token
		}
		// @ts-ignore
		req.headers.common['X-Forwarded-For'] = getLocalStorage('userIP')

		return req
	},
	(error: unknown): Promise<never> => {
		return Promise.reject(error)
	},
]

/**
 * Response Maanger for Axios
 *
 * @type {(((response: AxiosResponse) => Promise<AxiosResponse>) | ((error) => (AxiosPromise<any> | Promise<AxiosResponse<any> & AxiosResponse<never>>)))[]}
 */
const responseManager: (
	| ((response: AxiosResponse) => Promise<AxiosResponse>)
	| ((error: any) => AxiosPromise<never>)
)[] = [
	(response: AxiosResponse): Promise<AxiosResponse> => Promise.resolve(response?.data),
	async (error: any) => {
		if (error?.response?.status === 401 && !publicRoutes.includes(location.pathname)) {
			removeFromLocalStorage('user')
			location.href = loginRoute
		}

		return Promise.reject(error)
	},
]

request.interceptors.request.use(...requestManager)
request.interceptors.response.use(...responseManager)

export { request }
