/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericActionCreator } from '../../shared/action/generic.action'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { errorHandlers } from '../../utils/service-error-handler'
import { put, takeLatest } from 'redux-saga/effects'
import { IUser } from './users'
import {
	DataResponse,
	ICreateUserAction,
	IEditUserAction,
	IGetSingleUsersAction,
	IGetUsersAction,
	ISetContactRolesAction,
	ISetSingleUserAction,
	ISetUsersAction,
	USERS_ACTION_TYPES,
} from './users.actions'
import { createUser, editUser, getUser, getUserContactRoles, getUsers } from '../../services/users.service'
import * as qs from 'qs'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { push } from 'redux-first-history'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetUsersSaga({ data, type }: IGetUsersAction) {
	try {
		const qsObject = {
			...data,
			role: data.role?.roleId,
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const UsersData: DataResponse<IUser> = yield serviceWrapperSaga(getUsers, errorHandlers, qs.stringify(qsObject))

		if (UsersData) {
			yield put(
				GenericActionCreator<ISetUsersAction>({
					type: USERS_ACTION_TYPES.SET_USERS,
					data: UsersData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetUsersAction>({
				type: USERS_ACTION_TYPES.SET_USERS,
				data: {
					count: 0,
					users: [],
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* CreateUserSaga({ data }: ICreateUserAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(createUser, errorHandlers, data)

		yield put(push(MAIN_ROUTES.USERS))
		toast.success('Succesfully created the user')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetUsersAction>({
				type: USERS_ACTION_TYPES.GET_USERS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

function* EditUserSaga({ data }: IEditUserAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(editUser, errorHandlers, data)

		yield put(push(MAIN_ROUTES.USERS))
		toast.success('Succesfully edited the user')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetUsersAction>({
				type: USERS_ACTION_TYPES.GET_USERS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetSingleUserSaga({ data }: IGetSingleUsersAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const user: IUser = yield serviceWrapperSaga(getUser, errorHandlers, data)
		yield put(
			GenericActionCreator<ISetSingleUserAction>({
				type: USERS_ACTION_TYPES.SET_USER,
				data: user,
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSingleUserAction>({
				type: USERS_ACTION_TYPES.SET_USER,
				data: null,
			}),
		)
		yield put(push(MAIN_ROUTES.USERS))
		toast.error('There was an error with the user data')
	}
}

function* GetContactRolesSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const roles: IRole[] = yield serviceWrapperSaga(getUserContactRoles, errorHandlers)
		yield put(
			GenericActionCreator<ISetContactRolesAction>({
				type: USERS_ACTION_TYPES.SET_CONTACT_ROLES,
				data: roles,
			}),
		)
	} catch (e) {
		console.log(e)
		yield put(
			GenericActionCreator<ISetContactRolesAction>({
				type: USERS_ACTION_TYPES.SET_CONTACT_ROLES,
				data: [],
			}),
		)
	}
}

/**
 * UserModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* UserModuleSaga(): Generator {
	yield takeLatest(USERS_ACTION_TYPES.GET_USERS, GetUsersSaga)
	yield takeLatest(USERS_ACTION_TYPES.CREATE_USER, CreateUserSaga)
	yield takeLatest(USERS_ACTION_TYPES.EDIT_USER, EditUserSaga)
	yield takeLatest(USERS_ACTION_TYPES.GET_USER, GetSingleUserSaga)
	yield takeLatest(USERS_ACTION_TYPES.GET_CONTACT_ROLES, GetContactRolesSaga)
}
