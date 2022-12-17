/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRole } from '../Login/login'
import { IContactRole, IDeleteData, IUser, IUserFilter } from './users'

export const keys = {
	users: 'users',
}

export type DataResponse<T> = {
	count: number
	users: T[]
}

export enum USERS_ACTION_TYPES {
	SET_USERS = '[Users] Set Users',
	GET_USERS = '[Users] Get Users',
	GET_USER = '[Users] Get User',
	SET_USER = '[Users] Set User',
	SET_ROLES = '[Users] Set Roles',
	SET_CURRENT_PAGE = '[Users] Set Current Page',
	SET_FILTER = '[Users] Set Filter',
	CREATE_USER = '[Users] Create User',
	EDIT_USER = '[Users] Edit User',
	GET_CONTACT_ROLES = '[Users] Get Contact Roles',
	SET_CONTACT_ROLES = '[Users] Set Contact Roles',
	SET_DELETE_DATA = '[Users] Delete General Data',
}

export interface IGetUsersAction {
	type: USERS_ACTION_TYPES.GET_USERS
	data: IUserFilter
}

export interface ISetUsersAction {
	type: USERS_ACTION_TYPES.SET_USERS
	data: DataResponse<IUser>
}

export interface ISetRolesAction {
	type: USERS_ACTION_TYPES.SET_ROLES
	data: IRole[]
}

export interface ISetFilterAction {
	type: USERS_ACTION_TYPES.SET_FILTER
	data: { name: string; data: any }
}

export interface ICreateUserAction {
	type: USERS_ACTION_TYPES.CREATE_USER
	data: Partial<IUser>
}

export interface IEditUserAction {
	type: USERS_ACTION_TYPES.EDIT_USER
	data: Partial<IUser>
}

export interface IGetSingleUsersAction {
	type: USERS_ACTION_TYPES.GET_USER
	data: string
}

export interface ISetSingleUserAction {
	type: USERS_ACTION_TYPES.SET_USER
	data: IUser | null
}

export interface IGetContactRolesAction {
	type: USERS_ACTION_TYPES.GET_CONTACT_ROLES
}

export interface ISetContactRolesAction {
	type: USERS_ACTION_TYPES.SET_CONTACT_ROLES
	data: IContactRole[]
}

export interface ISetDeleteData {
	type: USERS_ACTION_TYPES.SET_DELETE_DATA
	data: IDeleteData
}

export type UserActions =
	| IGetUsersAction
	| ISetUsersAction
	| ISetRolesAction
	| ISetFilterAction
	| ICreateUserAction
	| IEditUserAction
	| IGetSingleUsersAction
	| ISetSingleUserAction
	| IGetContactRolesAction
	| ISetContactRolesAction
	| ISetDeleteData
