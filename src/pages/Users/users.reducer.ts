/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRole } from '../Login/login'
import { IContactRole, IDeleteData, IUser, IUserFilter } from './users'
import { UserActions, USERS_ACTION_TYPES } from './users.actions'

export interface IUsersState {
	count: number
	users: IUser[]
	loading: boolean
	roles: IRole[]
	currentPage: number
	filter: IUserFilter
	selectedUser: IUser | null
	contactRoles: IContactRole[]
	deleteData: IDeleteData
}

export const initialState: IUsersState = {
	count: 0,
	users: [],
	roles: [],
	loading: false,
	currentPage: 1,
	filter: {},
	selectedUser: null,
	contactRoles: [],
	deleteData: {
		deleteId: '',
		stateName: 'investors',
	},
}

export const UsersReducer = (state: Readonly<IUsersState> = initialState, action: UserActions): IUsersState => {
	switch (action.type) {
		case USERS_ACTION_TYPES.GET_USERS:
			return { ...state, loading: true }
		case USERS_ACTION_TYPES.SET_USER:
			return { ...state, selectedUser: action.data }
		case USERS_ACTION_TYPES.CREATE_USER:
			return { ...state, loading: true }
		case USERS_ACTION_TYPES.EDIT_USER:
			return { ...state, loading: true }
		case USERS_ACTION_TYPES.SET_USERS:
			return { ...state, loading: false, ...action.data }
		case USERS_ACTION_TYPES.SET_ROLES:
			return { ...state, roles: action.data }
		case USERS_ACTION_TYPES.SET_FILTER:
			return { ...state, filter: { ...state.filter, [action.data.name]: action.data.data } }
		case USERS_ACTION_TYPES.SET_CONTACT_ROLES:
			return { ...state, contactRoles: action.data }
		case USERS_ACTION_TYPES.SET_DELETE_DATA:
			return { ...state, deleteData: action.data }
		default:
			return state
	}
}
