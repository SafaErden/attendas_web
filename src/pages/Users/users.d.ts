import { IStateName } from '../../shared/types'
import { IRole } from '../Login/login'

export type UserProps = {
	[k: string]: unknown
	in?: boolean
}

export interface IUser {
	userId: number
	firstName: string
	lastName: string
	email: string
	phone: string
	roleId: number
	roleName: string
	active: true
	isVerified: true
	created: string
	jwtToken: string
	permissions: IPermisson[]
	AFunds: string
	GFunds: string
	OTasks: string
}

export interface IUserFilter {
	search?: string
	role?: IRole
	size?: number
	page?: number
}

export interface IContactRole {
	contactRoleId: number
	contactRoleName: string
}

export interface IDeleteData {
	deleteId: string
	qozbId?: string
	stateName: IStateName
	itemName?: string
}
