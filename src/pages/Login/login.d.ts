import { IUser } from '../Users/users'

export type LoginProps = {
	[k: string]: unknown
	in?: boolean
}

export interface IPermisson {
	context: string
	object: string
	operation: string
	role: string
}

export interface IRefreshTokenValues {
	refreshToken: string
	userId: string
}

export type ILoginresponse = IUser

export interface IRole {
	roleId: number
	roleName: string
	roleDescription: string
}

export interface IVerifyEmailData {
	verificationToken?: string
	email: string
	password: string
	confirmPassword: string
}

export interface IResetPasswordData {
	resetToken?: string
	password: string
	confirmPassword: string
	email?: string
}
