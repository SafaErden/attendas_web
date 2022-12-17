/* eslint-disable @typescript-eslint/no-explicit-any */

import { IFund } from '../Funds/funds'
import { IInvestor } from '../Investors/investors'
import { IQOZB } from '../QOZBS/qozbs'
import { IUser } from '../Users/users'
import { ICapzoneId, ICapzoneIdsFilter, IQuestion } from './capzoneIds'
import { CapzoneIdActions, CAPZONEIDS_ACTION_TYPES } from './capzoneIds.actions'
export interface ICapzoneIdsState {
	count: number
	capZoneIDs: ICapzoneId[]
	loading: boolean
	filter: ICapzoneIdsFilter
	selectedCapzoneId: ICapzoneId | null
	allQozbs: IQOZB[]
	allFunds: IFund[]
	allInvestors: IInvestor[]
	allUsers: IUser[]
	fund?: IFund
	qozb?: IQOZB
	investor?: IInvestor
	user?: IUser
	investorQuestions: IQuestion[]
	qozbQuestions: IQuestion[]
	isRelation: boolean
	currentTab: number
}

export const initialState: ICapzoneIdsState = {
	count: 0,
	capZoneIDs: [],
	loading: false,
	filter: {
		page: 1,
		size: 10,
	},
	selectedCapzoneId: null,
	allFunds: [],
	allQozbs: [],
	allInvestors: [],
	allUsers: [],
	investorQuestions: [],
	qozbQuestions: [],
	isRelation: false,
	currentTab: 1,
}

export const CapzoneIdsReducer = (
	state: Readonly<ICapzoneIdsState> = initialState,
	action: CapzoneIdActions,
): ICapzoneIdsState => {
	switch (action.type) {
		case CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID:
			return { ...state, selectedCapzoneId: action.data, loading: false }
		case CAPZONEIDS_ACTION_TYPES.CREATE_CAPZONEID:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.EDIT_CAPZONEID:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.DELETE_CAPZONEID:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.ACTIVATE_CAPZONEID:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.DEACTIVATE_CAPZONEID:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS:
			return { ...state, loading: false, ...action.data }
		case CAPZONEIDS_ACTION_TYPES.SET_FILTER:
			return { ...state, filter: { ...state.filter, [action.data.name]: action.data.data } }
		case CAPZONEIDS_ACTION_TYPES.SET_ALL_FUNDS:
			return { ...state, allFunds: action.data }
		case CAPZONEIDS_ACTION_TYPES.SET_ALL_INVESTORS:
			return { ...state, allInvestors: action.data }
		case CAPZONEIDS_ACTION_TYPES.SET_ALL_QOZBS:
			return { ...state, allQozbs: action.data }
		case CAPZONEIDS_ACTION_TYPES.SET_ALL_USERS:
			return { ...state, allUsers: action.data }
		case CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID_DETAIL_INFO:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID_DETAIL_INFO:
			return { ...state, ...action.data, loading: false }
		case CAPZONEIDS_ACTION_TYPES.RESET_FILTER:
			return {
				...state,
				filter: {
					page: 1,
					size: 10,
				},
			}
		case CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING:
			return { ...state, loading: !state.loading }
		case CAPZONEIDS_ACTION_TYPES.GET_INVESTOR_QUESTIONS:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.SET_INVESTOR_QUESTIONS:
			return { ...state, investorQuestions: action.data, loading: false }
		case CAPZONEIDS_ACTION_TYPES.UPDATE_INVESTOR_QUESTIONS:
			return { ...state, loading: true, currentTab: 1 }
		case CAPZONEIDS_ACTION_TYPES.GET_QOZB_QUESTIONS:
			return { ...state, loading: true }
		case CAPZONEIDS_ACTION_TYPES.SET_QOZB_QUESTIONS:
			return { ...state, qozbQuestions: action.data, loading: false }
		case CAPZONEIDS_ACTION_TYPES.UPDATE_QOZB_QUESTIONS:
			return { ...state, loading: true, currentTab: 2 }
		case CAPZONEIDS_ACTION_TYPES.SET_IS_RELATION:
			return { ...state, isRelation: action.data }
		case CAPZONEIDS_ACTION_TYPES.SET_CURRENT_TAB:
			return { ...state, currentTab: action.data }
		case CAPZONEIDS_ACTION_TYPES.GET_CZIDS_WITH_ID:
			return { ...state, loading: true }

		default:
			return state
	}
}
