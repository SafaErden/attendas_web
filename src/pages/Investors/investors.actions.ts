/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContact } from '../Funds/funds'
import { IInvestor, IInvestorsFilter, ILocation } from './investors'

export type InvestorDataResponse<T> = {
	count: number
	investors: T[]
}

export enum INVESTORS_ACTION_TYPES {
	SET_INVESTORS = '[Investors] Set Investors',
	GET_INVESTORS = '[Investors] Get Investors',
	GET_INVESTOR = '[Investors] Get Investor',
	SET_INVESTOR = '[Investors] Set Investor',
	SET_FILTER = '[Investors] Set Filter',
	CREATE_INVESTOR = '[Investors] Create Investor',
	EDIT_INVESTOR = '[Investors] Edit Investor',
	DELETE_INVESTOR = '[Investors] Delete Investor',
	GET_LOCATIONS = '[Investors] Get Locations',
	SET_LOCATIONS = '[Investors] Set Locations',
	SET_SELECTED_CONTACT = '[Investors] Set Selected Contact',
	SET_CONTACTS = '[Investors] Set Contacts',
	PUT_INVESTOR_CONTACTS = '[Investors] Put Investor Contacts',
	DELETE_INVESTOR_CONTACT = '[Investors] Delete Investor Contact',
	INVESTORS_TOGGLE_LODING = '[Investors] Toggle Loading',
}

export interface IGetInvestorsAction {
	type: INVESTORS_ACTION_TYPES.GET_INVESTORS
	data: IInvestorsFilter
}

export interface ISetInvestorsAction {
	type: INVESTORS_ACTION_TYPES.SET_INVESTORS
	data: InvestorDataResponse<IInvestor>
}

export interface ISetInvestorFilterAction {
	type: INVESTORS_ACTION_TYPES.SET_FILTER
	data: { name: string; data: any }
}

export interface ICreateInvestorAction {
	type: INVESTORS_ACTION_TYPES.CREATE_INVESTOR
	data: Partial<IInvestor>
}

export interface IEditInvestorAction {
	type: INVESTORS_ACTION_TYPES.EDIT_INVESTOR
	data: Partial<IInvestor>
}

export interface IGetSingleInvestorsAction {
	type: INVESTORS_ACTION_TYPES.GET_INVESTOR
	data: string
}

export interface IDeleteInvestorAction {
	type: INVESTORS_ACTION_TYPES.DELETE_INVESTOR
	data: string
}

export interface ISetSingleInvestorAction {
	type: INVESTORS_ACTION_TYPES.SET_INVESTOR
	data: IInvestor | null
}

export interface IGetInvestorLocationsAction {
	type: INVESTORS_ACTION_TYPES.GET_LOCATIONS
}

export interface ISetInvestorLocationsAction {
	type: INVESTORS_ACTION_TYPES.SET_LOCATIONS
	data: ILocation[]
}

export interface ISetSelectedContactAction {
	type: INVESTORS_ACTION_TYPES.SET_SELECTED_CONTACT
	data: Partial<IContact> | null
}

export interface ISetContactsAction {
	type: INVESTORS_ACTION_TYPES.SET_CONTACTS
	data: Partial<IContact>[]
}

export interface IPutInvestorContacstAction {
	type: INVESTORS_ACTION_TYPES.PUT_INVESTOR_CONTACTS
	data: {
		investorId: string
		contacts: Partial<IContact>[]
	}
}

export interface IDeleteInvestorContactAction {
	type: INVESTORS_ACTION_TYPES.DELETE_INVESTOR_CONTACT
	data: {
		investorId?: string
		contactId: string
	}
}

export interface IInvestorsToggleLoadingAction {
	type: INVESTORS_ACTION_TYPES.INVESTORS_TOGGLE_LODING
}

export type InvestorActions =
	| IGetInvestorsAction
	| ISetInvestorsAction
	| ISetInvestorFilterAction
	| ICreateInvestorAction
	| IEditInvestorAction
	| IGetSingleInvestorsAction
	| ISetSingleInvestorAction
	| IDeleteInvestorAction
	| IGetInvestorLocationsAction
	| ISetInvestorLocationsAction
	| ISetSelectedContactAction
	| ISetContactsAction
	| IPutInvestorContacstAction
	| IDeleteInvestorContactAction
	| IInvestorsToggleLoadingAction
