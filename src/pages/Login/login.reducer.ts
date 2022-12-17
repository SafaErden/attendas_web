/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginActions, LOGIN_ACTION_TYPES } from '../Login/login.actions'
import { IUser } from '../Users/users'

export interface ILoginState extends Partial<IUser> {
	isLoginFetching: boolean
	isLoginFetched: boolean
	isLoginFailed: boolean
	login: unknown
	isAuthenticated: boolean
	loading: boolean
}

export const initialState: ILoginState = {
	login: null,
	isLoginFetching: false,
	isLoginFetched: true,
	isLoginFailed: false,
	isAuthenticated: false,
	loading: false,
}

export const LoginReducer = (state: Readonly<ILoginState> = initialState, action: LoginActions): ILoginState => {
	switch (action.type) {
		case LOGIN_ACTION_TYPES.GET_LOGIN:
			return { ...state, isLoginFetching: true, isLoginFetched: false, isLoginFailed: false }
		case LOGIN_ACTION_TYPES.GET_LOGIN_FAILED:
			return { ...state, isLoginFetching: false, isLoginFetched: true, isLoginFailed: true }
		case LOGIN_ACTION_TYPES.SET_LOGIN:
			return {
				...state,
				isAuthenticated: true,
				...action.data,
				isLoginFetching: false,
				isLoginFetched: true,
			}
		case LOGIN_ACTION_TYPES.LOGOUT:
			return {
				...initialState,
			}
		case LOGIN_ACTION_TYPES.FORGOT_PASSWORD:
			return {
				...state,
				loading: true,
			}
		case LOGIN_ACTION_TYPES.TOGGLE_LOADING:
			return {
				...state,
				loading: !state.loading,
			}
		case LOGIN_ACTION_TYPES.VERIFY_EMAIL:
			return {
				...state,
				loading: true,
			}
		case LOGIN_ACTION_TYPES.RESET_PASSWORD:
			return {
				...state,
				loading: true,
			}

		default:
			return state
	}
}
