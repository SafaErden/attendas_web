/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { CombinedState, combineReducers, Reducer } from 'redux'
import { reduxHistoryContext } from '../../utils/history'
import { RouterState } from 'redux-first-history'
import { LoginReducer, ILoginState } from '../../pages/Login/login.reducer'
import { HomeReducer, IHomeState } from '../../pages/Home/home.reducer'
import { IUsersState, UsersReducer } from '../../pages/Users/users.reducer'
import { PaginationState, PaginationReducer } from '../../shared/pagination/pagination.reducer'
import { IFundsState, FundsReducer } from '../../pages/Funds/funds.reducer'
import { IModalState, ModalReducer } from '../../shared/components/modal/modal.reducer'
import { IQozbsState, QozbsReducer } from '../../pages/QOZBS/qozb.reducer'
import { IInvestorsState, InvestorsReducer } from '../../pages/Investors/investors.reducer'
import { CapzoneIdsReducer, ICapzoneIdsState } from '../../pages/CapzoneIds/capzoneIds.reducer'

export interface IGlobalState {
	router: RouterState
	user: ILoginState
	home: IHomeState
	users: IUsersState
	pagination: PaginationState
	funds: IFundsState
	modal: IModalState
	qozbs: IQozbsState
	investors: IInvestorsState
	capzoneIds: ICapzoneIdsState
}

const { routerReducer } = reduxHistoryContext

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const createReducer = (
	injectedReducers: Record<string, Reducer<keyof IGlobalState>> = {},
): Reducer<CombinedState<IGlobalState>> =>
	combineReducers<IGlobalState>({
		router: routerReducer,
		user: LoginReducer,
		home: HomeReducer,
		users: UsersReducer,
		pagination: PaginationReducer,
		funds: FundsReducer,
		modal: ModalReducer,
		qozbs: QozbsReducer,
		investors: InvestorsReducer,
		capzoneIds: CapzoneIdsReducer,
		...injectedReducers,
	})
