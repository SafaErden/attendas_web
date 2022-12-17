/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFund } from '../Funds/funds'
import { IInvestor } from '../Investors/investors'
import { IQOZB } from '../QOZBS/qozbs'
import { IUser } from '../Users/users'
import {
	ICapzoneId,
	ICapzoneIdDetailInfoData,
	ICapzoneIdsFilter,
	ICapzoneIdWithIdsFilter,
	IQuestion,
} from './capzoneIds'

export type CapzoneIdDataResponse<T> = {
	count: number
	capZoneIDs: T[]
}

export enum CAPZONEIDS_ACTION_TYPES {
	SET_CAPZONEIDS = '[CapzoneIds] Set CapzoneIds',
	GET_CAPZONEIDS = '[CapzoneIds] Get CapzoneIds',
	GET_CAPZONEID = '[CapzoneIds] Get CapzoneId',
	SET_CAPZONEID = '[CapzoneIds] Set CapzoneId',
	SET_FILTER = '[CapzoneIds] Set Filter',
	CREATE_CAPZONEID = '[CapzoneIds] Create CapzoneId',
	EDIT_CAPZONEID = '[CapzoneIds] Edit CapzoneId',
	DELETE_CAPZONEID = '[CapzoneIds] Delete CapzoneId',
	ACTIVATE_CAPZONEID = '[CapzoneIds] Activate CapzoneId',
	DEACTIVATE_CAPZONEID = '[CapzoneIds] Deactivate CapzoneId',
	GET_ALL_QOZBS = '[CapzoneIds] Get All Qozbs',
	SET_ALL_QOZBS = '[CapzoneIds] Set All Qozbs',
	GET_ALL_FUNDS = '[CapzoneIds] Get All Funds',
	SET_ALL_FUNDS = '[CapzoneIds] Set All Funds',
	GET_ALL_INVESTORS = '[CapzoneIds] Get All Investors',
	SET_ALL_INVESTORS = '[CapzoneIds] Set All Investors',
	GET_ALL_USERS = '[CapzoneIds] Get All Users',
	SET_ALL_USERS = '[CapzoneIds] Set All Users',
	GET_CAPZONEID_DETAIL_INFO = '[CapzoneIds] Get CapzoneId Detail Info',
	SET_CAPZONEID_DETAIL_INFO = '[CapzoneIds] Set CapzoneId Detail Info',
	RESET_FILTER = '[CapzoneIds] Reset Filter',
	CAPZONEID_TOGGLE_LOADING = '[CapzoneIds] Toggle Loading',
	GET_INVESTOR_QUESTIONS = '[CapzoneIds] Get Investor Questions',
	SET_INVESTOR_QUESTIONS = '[CapzoneIds] Set Investor Questions',
	UPDATE_INVESTOR_QUESTIONS = '[CapzoneIds] Update Investor Questions',
	SET_IS_RELATION = '[CapzoneIds] Set Is Relation',
	SET_CURRENT_TAB = '[CapzoneIds] Set Current Tab',
	GET_QOZB_QUESTIONS = '[CapzoneIds] Get QOZB Questions',
	SET_QOZB_QUESTIONS = '[CapzoneIds] Set QOZB Questions',
	UPDATE_QOZB_QUESTIONS = '[CapzoneIds] Update QOZB Questions',
	GET_CZIDS_WITH_ID = '[CapzoneIds] Get CZIDs with ID',
}

export interface IGetCapzoneIdsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS
	data: ICapzoneIdsFilter
}

export interface ISetCapzoneIdsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS
	data: CapzoneIdDataResponse<ICapzoneId>
}

export interface ISetCapzoneIdFilterAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_FILTER
	data: { name: string; data: any }
}

export interface ICreateCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.CREATE_CAPZONEID
	data: Partial<ICapzoneId>
}

export interface IEditCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.EDIT_CAPZONEID
	data: Partial<ICapzoneId>
}

export interface IGetSingleCapzoneIdsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID
	data: string
}

export interface IDeleteCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.DELETE_CAPZONEID
	data: string
}

export interface ISetSingleCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID
	data: ICapzoneId | null
}

export interface IActivateCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.ACTIVATE_CAPZONEID
	data: string
}
export interface IDeactivateCapzoneIdAction {
	type: CAPZONEIDS_ACTION_TYPES.DEACTIVATE_CAPZONEID
	data: string
}

export interface IGetAllQozbsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_ALL_QOZBS
}

export interface ISetAllQozbsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_ALL_QOZBS
	data: IQOZB[]
}

export interface IGetAllFundsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_ALL_FUNDS
}

export interface ISetAllFundsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_ALL_FUNDS
	data: IFund[]
}

export interface IGetAllInvestorsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_ALL_INVESTORS
}

export interface ISetAllInvestorsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_ALL_INVESTORS
	data: IInvestor[]
}

export interface IGetAllUsersAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_ALL_USERS
}

export interface ISetAllUsersAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_ALL_USERS
	data: IUser[]
}

export interface IGetCapzoneIdDetailInfoAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID_DETAIL_INFO
	data: ICapzoneId
}

export interface ISetCapzoneIdDetailInfoAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID_DETAIL_INFO
	data: ICapzoneIdDetailInfoData
}

export interface IResetCapzoneIdFilterAction {
	type: CAPZONEIDS_ACTION_TYPES.RESET_FILTER
}

export interface ICapZonetoggleLoadingAction {
	type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING
}

export interface IGetInvestorQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_INVESTOR_QUESTIONS
	data: any
}

export interface ISetInvestorQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_INVESTOR_QUESTIONS
	data: IQuestion[]
}

export interface IUpdateInvestorQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.UPDATE_INVESTOR_QUESTIONS
	data: {
		relations: IQuestion[]
		czidId?: string
	}
}

export interface IGetQOZBQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_QOZB_QUESTIONS
	data: any
}

export interface ISetQOZBQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_QOZB_QUESTIONS
	data: IQuestion[]
}

export interface IUpdateQOZBQuestionsAction {
	type: CAPZONEIDS_ACTION_TYPES.UPDATE_QOZB_QUESTIONS
	data: {
		relations: IQuestion[]
		czidId?: string
	}
}

export interface ISetIsRelationAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_IS_RELATION
	data: boolean
}

export interface ISetCurrentTabAction {
	type: CAPZONEIDS_ACTION_TYPES.SET_CURRENT_TAB
	data: number
}

export interface IGetCapzoneIdsWithIdAction {
	type: CAPZONEIDS_ACTION_TYPES.GET_CZIDS_WITH_ID
	data: ICapzoneIdWithIdsFilter
}

export type CapzoneIdActions =
	| IGetCapzoneIdsAction
	| ISetCapzoneIdsAction
	| ISetCapzoneIdFilterAction
	| ICreateCapzoneIdAction
	| IEditCapzoneIdAction
	| IGetSingleCapzoneIdsAction
	| ISetSingleCapzoneIdAction
	| IDeleteCapzoneIdAction
	| IActivateCapzoneIdAction
	| IDeactivateCapzoneIdAction
	| IGetAllQozbsAction
	| ISetAllQozbsAction
	| IGetAllFundsAction
	| ISetAllFundsAction
	| IGetAllInvestorsAction
	| ISetAllInvestorsAction
	| IGetAllUsersAction
	| ISetAllUsersAction
	| IGetCapzoneIdDetailInfoAction
	| ISetCapzoneIdDetailInfoAction
	| IResetCapzoneIdFilterAction
	| ICapZonetoggleLoadingAction
	| IGetInvestorQuestionsAction
	| ISetInvestorQuestionsAction
	| IUpdateInvestorQuestionsAction
	| ISetIsRelationAction
	| ISetCurrentTabAction
	| IGetQOZBQuestionsAction
	| ISetQOZBQuestionsAction
	| IUpdateQOZBQuestionsAction
	| IGetCapzoneIdsWithIdAction
