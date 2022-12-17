/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuestion } from '../CapzoneIds/capzoneIds'
import { IContact, IFund, IFundEntityType, IFundsFilter, IFundType, ILocation } from './funds'

export type FundDataResponse<T> = {
	count: number
	funds: T[]
}

export enum FUNDS_ACTION_TYPES {
	SET_FUNDS = '[Funds] Set Funds',
	GET_FUNDS = '[Funds] Get Funds',
	GET_FUNDS_QUESTIONS = '[Funds] Get Funds Questions',
	SET_FUNDS_QUESTIONS = '[Funds] Set Funds Questions',
	GET_FUND = '[Funds] Get Fund',
	SET_FUND = '[Funds] Set Fund',
	GET_FUND_TYPES = '[Funds] Get Fund Types',
	SET_FUND_TYPES = '[Funds] Set Fund Types',
	SET_FILTER = '[Funds] Set Filter',
	CREATE_FUND = '[Funds] Create Fund',
	EDIT_FUND = '[Funds] Edit Fund',
	DELETE_FUND = '[Funds] Delete Fund',
	ACTIVATE_FUND = '[Funds] Activate Fund',
	DEACTIVATE_FUND = '[Funds] Deactivate Fund',
	GET_ENTITY_TYPES = '[Funds] Get Entity Types',
	SET_ENTITY_TYPES = '[Funds] Set Entity Types',
	GET_LOCATIONS = '[Funds] Get Locations',
	SET_LOCATIONS = '[Funds] Set Locations',
	SET_SELECTED_CONTACT = '[Funds] Set Selected Contact',
	SET_CONTACTS = '[Funds] Set Contacts',
	PUT_FUND_CONTACTS = '[Funds] Put Fund Contacts',
	DELETE_FUND_CONTACT = '[Funds] Delete Fund Contact',
	FUNDS_TOGGLE_LODING = '[Funds] Toggle Loading',
}

export interface IGetFundsAction {
	type: FUNDS_ACTION_TYPES.GET_FUNDS
	data: IFundsFilter
}
export interface IGetFundsQuestionsAction {
	type: FUNDS_ACTION_TYPES.GET_FUNDS_QUESTIONS
}
export interface ISetFundsQuestionsAction {
	type: FUNDS_ACTION_TYPES.SET_FUNDS_QUESTIONS
	data: IQuestion[]
}

export interface ISetFundsAction {
	type: FUNDS_ACTION_TYPES.SET_FUNDS
	data: FundDataResponse<IFund>
}

export interface IGetFundTypesAction {
	type: FUNDS_ACTION_TYPES.GET_FUND_TYPES
}

export interface ISetFundTypesAction {
	type: FUNDS_ACTION_TYPES.SET_FUND_TYPES
	data: IFundType[]
}

export interface ISetFundFilterAction {
	type: FUNDS_ACTION_TYPES.SET_FILTER
	data: { name: string; data: any }
}

export interface ICreateFundAction {
	type: FUNDS_ACTION_TYPES.CREATE_FUND
	data: Partial<IFund>
}

export interface IEditFundAction {
	type: FUNDS_ACTION_TYPES.EDIT_FUND
	data: Partial<IFund>
}

export interface IGetSingleFundsAction {
	type: FUNDS_ACTION_TYPES.GET_FUND
	data: string
}

export interface IDeleteFundAction {
	type: FUNDS_ACTION_TYPES.DELETE_FUND
	data: string
}

export interface ISetSingleFundAction {
	type: FUNDS_ACTION_TYPES.SET_FUND
	data: IFund | null
}

export interface IActivateFundAction {
	type: FUNDS_ACTION_TYPES.ACTIVATE_FUND
	data: string
}
export interface IDeactivateFundAction {
	type: FUNDS_ACTION_TYPES.DEACTIVATE_FUND
	data: string
}

export interface IGetEntityTypesAction {
	type: FUNDS_ACTION_TYPES.GET_ENTITY_TYPES
}

export interface ISetEntityTypesAction {
	type: FUNDS_ACTION_TYPES.SET_ENTITY_TYPES
	data: IFundEntityType[]
}

export interface IGetLocationsAction {
	type: FUNDS_ACTION_TYPES.GET_LOCATIONS
}

export interface ISetLocationsAction {
	type: FUNDS_ACTION_TYPES.SET_LOCATIONS
	data: ILocation[]
}

export interface ISetSelectedContactAction {
	type: FUNDS_ACTION_TYPES.SET_SELECTED_CONTACT
	data: Partial<IContact> | null
}

export interface ISetContactsAction {
	type: FUNDS_ACTION_TYPES.SET_CONTACTS
	data: Partial<IContact>[]
}

export interface IPutFundContacstAction {
	type: FUNDS_ACTION_TYPES.PUT_FUND_CONTACTS
	data: {
		fundId: string
		contacts: Partial<IContact>[]
	}
}

export interface IDeleteFundContactAction {
	type: FUNDS_ACTION_TYPES.DELETE_FUND_CONTACT
	data: {
		fundId?: string
		contactId: string
	}
}
export interface IFundsToggleLoadingAction {
	type: FUNDS_ACTION_TYPES.FUNDS_TOGGLE_LODING
}

export type FundActions =
	| IGetFundsAction
	| IGetFundsQuestionsAction
	| ISetFundsQuestionsAction
	| ISetFundsAction
	| IGetFundTypesAction
	| ISetFundTypesAction
	| ISetFundFilterAction
	| ICreateFundAction
	| IEditFundAction
	| IGetSingleFundsAction
	| ISetSingleFundAction
	| IDeleteFundAction
	| IActivateFundAction
	| IDeactivateFundAction
	| IGetEntityTypesAction
	| ISetEntityTypesAction
	| IGetLocationsAction
	| ISetLocationsAction
	| ISetSelectedContactAction
	| ISetContactsAction
	| IPutFundContacstAction
	| IDeleteFundContactAction
	| IFundsToggleLoadingAction
