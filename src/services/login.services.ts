import { IResetPasswordData, IVerifyEmailData } from '@src/pages/Login/login'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'

export const loginService = (data: { email: string; password: string; IP: string }) =>
	request.post(endpoints.login(), data)

export const forgatPassword = (data: { email: string }) => request.post(endpoints.forgotPassword(), data)
export const verifyEmail = (data: IVerifyEmailData) => request.post(endpoints.verifyEmail(), data)
export const resetPassword = (data: IResetPasswordData) => request.post(endpoints.resetPassword(), data)
