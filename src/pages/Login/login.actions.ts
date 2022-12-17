/* eslint-disable @typescript-eslint/no-explicit-any */

import { IResetPasswordData, IVerifyEmailData } from './login'

export enum LOGIN_ACTION_TYPES {
	SET_LOGIN = '[Login] Set Login',
	GET_LOGIN = '[Login] Get Login',
	GET_LOGIN_FAILED = '[Login] Get Login Failed',
	FORGOT_PASSWORD = '[Login] Forgot Password',
	LOGOUT = '[Login] Logout',
	TOGGLE_LOADING = '[Login] Toggle Loading',
	VERIFY_EMAIL = '[Login] Verify Email',
	RESET_PASSWORD = '[Login] Reset Password',
}

export interface IGetLoginAction {
	type: LOGIN_ACTION_TYPES.GET_LOGIN
	data: any
}

export interface IGetLoginFailedAction {
	type: LOGIN_ACTION_TYPES.GET_LOGIN_FAILED
}

export interface ISetLoginAction {
	type: LOGIN_ACTION_TYPES.SET_LOGIN
	data: any
}

export interface ILogoutAction {
	type: LOGIN_ACTION_TYPES.LOGOUT
}

export interface IForgotPasswordAction {
	type: LOGIN_ACTION_TYPES.FORGOT_PASSWORD
	data: string
}

export interface IToggleLoadingdAction {
	type: LOGIN_ACTION_TYPES.TOGGLE_LOADING
}

export interface IVerifayEmailAction {
	type: LOGIN_ACTION_TYPES.VERIFY_EMAIL
	data: IVerifyEmailData
}

export interface IResetPasswordAction {
	type: LOGIN_ACTION_TYPES.RESET_PASSWORD
	data: IResetPasswordData
}

export type LoginActions =
	| IGetLoginAction
	| ISetLoginAction
	| IGetLoginFailedAction
	| ILogoutAction
	| IForgotPasswordAction
	| IToggleLoadingdAction
	| IVerifayEmailAction
	| IResetPasswordAction
