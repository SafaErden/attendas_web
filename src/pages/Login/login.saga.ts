/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	IForgotPasswordAction,
	IGetLoginAction,
	IGetLoginFailedAction,
	ILogoutAction,
	IResetPasswordAction,
	ISetLoginAction,
	IToggleLoadingdAction,
	IVerifayEmailAction,
	LOGIN_ACTION_TYPES,
} from '../../pages/Login/login.actions'
import { forgatPassword, loginService, resetPassword, verifyEmail } from '../../services/login.services'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { removeFromLocalStorage, setLocalStorage } from '../../utils/helper'
import { errorHandlers } from '../../utils/service-error-handler'
import { push } from 'redux-first-history'
import { put, takeLatest } from 'redux-saga/effects'
import { IUser } from '../Users/users'
import { toast } from 'react-toastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* LoginSaga({ data, type }: any) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const LoginUserData: IUser = yield serviceWrapperSaga(loginService, errorHandlers, {
			...data,
		})

		if (LoginUserData) {
			setLocalStorage('user', LoginUserData)

			yield put(
				GenericActionCreator<ISetLoginAction>({
					type: LOGIN_ACTION_TYPES.SET_LOGIN,
					data: LoginUserData,
				}),
			)

			yield put(push(MAIN_ROUTES.FUNDS))
		}
	} catch (e) {
		yield put(GenericActionCreator<IGetLoginFailedAction>({ type: LOGIN_ACTION_TYPES.GET_LOGIN_FAILED }))
	}
}
function* LogoutSaga() {
	yield removeFromLocalStorage('user')
}

function* ForgatPasswordSaga({ data }: IForgotPasswordAction) {
	try {
		// @ts-ignore
		const res: any = yield serviceWrapperSaga(forgatPassword, errorHandlers, { email: data })
		toast.success(res.message)
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
	} catch (e) {
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
		console.log(e)
	}
}

function* VerifyEmailSaga({ data }: IVerifayEmailAction) {
	try {
		// @ts-ignore
		const res: any = yield serviceWrapperSaga(verifyEmail, errorHandlers, data)
		toast.success(res.message)
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
		yield put(
			GenericActionCreator<IGetLoginAction>({
				type: LOGIN_ACTION_TYPES.GET_LOGIN,
				data: {
					email: data.email,
					password: data.password,
				},
			}),
		)
	} catch (e) {
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
		console.log(e)
	}
}

function* ResetPasswordSaga({ data }: IResetPasswordAction) {
	try {
		// @ts-ignore
		const res: any = yield serviceWrapperSaga(resetPassword, errorHandlers, data)
		toast.success(res.message)
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
		yield put(GenericActionCreator<ILogoutAction>({ type: LOGIN_ACTION_TYPES.LOGOUT }))
		yield put(push(MAIN_ROUTES.LOGIN))
	} catch (e) {
		yield put(GenericActionCreator<IToggleLoadingdAction>({ type: LOGIN_ACTION_TYPES.TOGGLE_LOADING }))
		console.log(e)
	}
}

/**
 * LoginModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* LoginModuleSaga(): Generator {
	yield takeLatest(LOGIN_ACTION_TYPES.GET_LOGIN, LoginSaga)
	yield takeLatest(LOGIN_ACTION_TYPES.LOGOUT, LogoutSaga)
	yield takeLatest(LOGIN_ACTION_TYPES.FORGOT_PASSWORD, ForgatPasswordSaga)
	yield takeLatest(LOGIN_ACTION_TYPES.VERIFY_EMAIL, VerifyEmailSaga)
	yield takeLatest(LOGIN_ACTION_TYPES.RESET_PASSWORD, ResetPasswordSaga)
}
