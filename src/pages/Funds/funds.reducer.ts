/* eslint-disable @typescript-eslint/no-explicit-any */

import { IQuestion } from '../CapzoneIds/capzoneIds'
import { IContact, IFund, IFundEntityType, IFundsFilter, IFundType, ILocation } from './funds'
import { FundActions, FUNDS_ACTION_TYPES } from './funds.actions'

export interface IFundsState {
	count: number
	funds: IFund[]
	fundsQuestions: IQuestion[]
	loading: boolean
	filter: IFundsFilter
	selectedFund: IFund | null
	fundTypes: IFundType[]
	entityTypes: IFundEntityType[]
	locations: ILocation[]
	selectedContact: Partial<IContact> | null
	contacts: Partial<IContact>[]
}

export const initialState: IFundsState = {
	count: 0,
	funds: [],
	fundsQuestions: [],
	fundTypes: [],
	loading: false,
	filter: {
		page: 1,
		size: 10,
	},
	selectedFund: null,
	entityTypes: [],
	locations: [],
	selectedContact: null,
	contacts: [],
}

export const FundsReducer = (state: Readonly<IFundsState> = initialState, action: FundActions): IFundsState => {
	switch (action.type) {
		case FUNDS_ACTION_TYPES.GET_FUNDS:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.GET_FUNDS_QUESTIONS:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.SET_FUNDS_QUESTIONS:
			return { ...state, fundsQuestions: action.data, loading: false }
		case FUNDS_ACTION_TYPES.SET_FUND:
			return { ...state, selectedFund: action.data, loading: false }
		case FUNDS_ACTION_TYPES.CREATE_FUND:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.EDIT_FUND:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.DELETE_FUND:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.ACTIVATE_FUND:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.DEACTIVATE_FUND:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.SET_FUNDS:
			return { ...state, loading: false, ...action.data }
		case FUNDS_ACTION_TYPES.SET_FUND_TYPES:
			return { ...state, fundTypes: action.data }
		case FUNDS_ACTION_TYPES.SET_FILTER:
			return { ...state, filter: { ...state.filter, [action.data.name]: action.data.data } }
		case FUNDS_ACTION_TYPES.SET_ENTITY_TYPES:
			return { ...state, entityTypes: action.data }
		case FUNDS_ACTION_TYPES.SET_LOCATIONS:
			return { ...state, locations: action.data }
		case FUNDS_ACTION_TYPES.SET_SELECTED_CONTACT:
			return { ...state, selectedContact: action.data }
		case FUNDS_ACTION_TYPES.SET_CONTACTS:
			return { ...state, contacts: action.data, loading: false }
		case FUNDS_ACTION_TYPES.PUT_FUND_CONTACTS:
			return { ...state, loading: true }
		case FUNDS_ACTION_TYPES.DELETE_FUND_CONTACT:
			if (!action.data.fundId) return { ...state, loading: true }
			return state
		case FUNDS_ACTION_TYPES.FUNDS_TOGGLE_LODING:
			return { ...state, loading: !state.loading }
		default:
			return state
	}
}
