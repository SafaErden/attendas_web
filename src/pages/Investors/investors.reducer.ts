/* eslint-disable @typescript-eslint/no-explicit-any */

import { IContact } from '../Funds/funds'
import { IInvestor, IInvestorsFilter, ILocation } from './investors'
import { InvestorActions, INVESTORS_ACTION_TYPES } from './investors.actions'

export interface IInvestorsState {
	count: number
	investors: IInvestor[]
	loading: boolean
	filter: IInvestorsFilter
	selectedInvestor: IInvestor | null
	locations: ILocation[]
	selectedContact: Partial<IContact> | null
	contacts: Partial<IContact>[]
}

export const initialState: IInvestorsState = {
	count: 0,
	investors: [],
	loading: false,
	filter: {
		page: 1,
		size: 10,
	},
	selectedInvestor: null,
	locations: [],
	selectedContact: null,
	contacts: [],
}

export const InvestorsReducer = (
	state: Readonly<IInvestorsState> = initialState,
	action: InvestorActions,
): IInvestorsState => {
	switch (action.type) {
		case INVESTORS_ACTION_TYPES.GET_INVESTORS:
			return { ...state, loading: true }
		case INVESTORS_ACTION_TYPES.SET_INVESTOR:
			return { ...state, selectedInvestor: action.data, loading: false }
		case INVESTORS_ACTION_TYPES.CREATE_INVESTOR:
			return { ...state, loading: true }
		case INVESTORS_ACTION_TYPES.EDIT_INVESTOR:
			return { ...state, loading: true }
		case INVESTORS_ACTION_TYPES.DELETE_INVESTOR:
			return { ...state, loading: true }
		case INVESTORS_ACTION_TYPES.SET_INVESTORS:
			return { ...state, loading: false, ...action.data }
		case INVESTORS_ACTION_TYPES.SET_FILTER:
			return { ...state, filter: { ...state.filter, [action.data.name]: action.data.data } }
		case INVESTORS_ACTION_TYPES.SET_LOCATIONS:
			return { ...state, locations: action.data }
		case INVESTORS_ACTION_TYPES.SET_SELECTED_CONTACT:
			return { ...state, selectedContact: action.data }
		case INVESTORS_ACTION_TYPES.SET_CONTACTS:
			return { ...state, contacts: action.data, loading: false }
		case INVESTORS_ACTION_TYPES.PUT_INVESTOR_CONTACTS:
			return { ...state, loading: true }
		case INVESTORS_ACTION_TYPES.DELETE_INVESTOR_CONTACT:
			if (!action.data.investorId) return { ...state, loading: true }
			return state
		case INVESTORS_ACTION_TYPES.INVESTORS_TOGGLE_LODING:
			return { ...state, loading: !state.loading }
		default:
			return state
	}
}
