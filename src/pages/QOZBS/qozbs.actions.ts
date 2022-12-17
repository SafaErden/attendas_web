/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuestion } from '../CapzoneIds/capzoneIds'
import { IContact } from '../Funds/funds'
import {
	IAllAssetsFilter,
	IAsset,
	IAnyQuestions,
	IAssetQuestionsCreateOrUpdateData,
	IAssetType,
	IBussinesType,
	IDeleteQozbCOntactData,
	IPutQozbContactsData,
	IQOZB,
	IQOZBAssetFilter,
	IQOZBAssetFilterandData,
	IQozbAssetsResponse,
	IQozbFilter,
	IQozbLocation,
} from './qozbs'

export const keys = {
	qozbs: 'qozbs',
}

export type QozbDataResponse<T> = {
	count: number
	qozbs: T[]
}

export type QozbAllAssetsDataResponse<T> = {
	count: number
	assets: T[]
}

export enum QOZBS_ACTION_TYPES {
	SET_QOZBS = '[Qozbs] Set Qozbs',
	GET_QOZBS = '[Qozbs] Get Qozbs',
	GET_QOZBS_QUESTIONS = '[Qozbs] Get Qozbs Questions',
	SET_QOZBS_QUESTIONS = '[Qozbs] Set Qozbs Questions',
	GET_QOZB = '[Qozbs] Get Qozb',
	SET_QOZB = '[Qozbs] Set Qozb',
	SET_FILTER = '[Qozbs] Set Filter',
	CREATE_QOZB = '[Qozbs] Create Qozb',
	EDIT_QOZB = '[Qozbs] Edit Qozb',
	GET_ALL_QOZBS = '[Qozbs] Get All Qozbs',
	SET_ALL_QOZBS = '[Qozbs] Set All Qozbs',
	GET_QOZB_TYPES = '[Qozbs] Get Qozb Types',
	SET_QOZB_TYPES = '[Qozbs] Set Qozb Types',
	GET_QOZB_ENTITY_TYPES = '[Qozbs] Get Qozb Entity Types',
	SET_QOZB_ENTITY_TYPES = '[Qozbs] Set Qozb Entity Types',
	GET_PROPERTY_OWNERS = '[Qozbs] Get Property Owners',
	SET_PROPERTY_OWNERS = '[Qozbs] Set Property Owners',
	GET_QOZB_LOCATIONS = '[Qozbs] Get Qozb Locations',
	SET_QOZB_LOCATIONS = '[Qozbs] Set Qozb Locations',
	DELETE_QOZB = '[Qozbs] Delete Qozb',
	PUT_QOZB_CONTACTS = '[Qozbs] Put Qozb Contacts',
	SET_QOZB_CONTACTS = '[Qozbs] Set Contacts',
	SET_SELECTED_CONTACT = '[Qozbs] Set Selected Contact',
	ACTIVATE_QOZB = '[Qozbs] activate Qozb',
	DEACTIVATE_QOZB = '[Qozbs] Deactivate Qozb',
	DELETE_QOZB_CONTACT = '[Qozbs] Delete Qozb Contact',
	GET_ASSET_TYPES = '[Qozbs] Get Asset Types',
	SET_ASSET_TYPES = '[Qozbs] Set Asset Types',
	GET_ALL_ASSETS = '[Qozbs] Get Assets',
	SET_ALL_ASSETS = '[Qozbs] Set Assets',
	GET_QOZB_ASSETS = '[Qozbs] Get QOZB Assets',
	SET_QOZB_ASSETS = '[Qozbs] Set QOZB Assets',
	ADD_ASSET = '[Qozbs] Add Asset',
	UPDATE_ASSET = '[Qozbs] Update Asset',
	DELETE_ASSET = '[Qozbs] Delete Asset',
	ACTIVATE_ASSET = '[Qozbs] Activate Asset',
	DEACTIVATE_ASSET = '[Qozbs] Deactivate Asset',
	GET_ASSET_DETAIL = '[Qozbs] Get Asset Detail',
	SET_ASSET_DETAIL = '[Qozbs] Set Asset Detail',
	QOZB_TOGGLE_LOADING = '[Qozbs] Toggle Loading',
	SET_ALL_ASSETS_FILTER = '[Qozbs] Set All Assets Filter',
	GET_ASSET_QUESTIONS = '[Qozbs] Get Asset Questions',
	SET_ASSET_QUESTIONS = '[Qozbs] Set Asset Questions',
	SET_ASSET_RELATIONS = '[Qozbs] Set Asset Relations',
	CREATE_OR_UPDATE_ASSET_RELATIONS = '[Qozbs] Create Or Update Asset Relations',
}

export interface IGetQozbsAction {
	type: QOZBS_ACTION_TYPES.GET_QOZBS
	data: IQozbFilter
}

export interface IGetQozbsQuestionsAction {
	type: QOZBS_ACTION_TYPES.GET_QOZBS_QUESTIONS
}

export interface ISetQozbsQuestionsAction {
	type: QOZBS_ACTION_TYPES.SET_QOZBS_QUESTIONS
	data: IQuestion[]
}

export interface ISetQozbsAction {
	type: QOZBS_ACTION_TYPES.SET_QOZBS
	data: QozbDataResponse<IQOZB>
}

export interface IGetAllQozbsAction {
	type: QOZBS_ACTION_TYPES.GET_ALL_QOZBS
}

export interface ISetAllQozbsAction {
	type: QOZBS_ACTION_TYPES.SET_ALL_QOZBS
	data: QozbDataResponse<IQOZB>
}

export interface ISetFilterAction {
	type: QOZBS_ACTION_TYPES.SET_FILTER
	data: { name: string; data: any }
}

export interface ICreateQozbAction {
	type: QOZBS_ACTION_TYPES.CREATE_QOZB
	data: Partial<IQOZB>
}

export interface IEditQozbAction {
	type: QOZBS_ACTION_TYPES.EDIT_QOZB
	data: Partial<IQOZB>
}

export interface IGetSingleQozbsAction {
	type: QOZBS_ACTION_TYPES.GET_QOZB
	data: string | number
}

export interface ISetSingleQozbAction {
	type: QOZBS_ACTION_TYPES.SET_QOZB
	data: IQOZB | null
}

export interface IGetQozbTypesAction {
	type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES
}

export interface ISetQozbTypesAction {
	type: QOZBS_ACTION_TYPES.SET_QOZB_TYPES
	data: IBussinesType[]
}

export interface IGetQozbEntityTypesAction {
	type: QOZBS_ACTION_TYPES.GET_QOZB_ENTITY_TYPES
}

export interface IGetPropertyOwnersAction {
	type: QOZBS_ACTION_TYPES.GET_PROPERTY_OWNERS
}

export interface IGetQozbLocationsAction {
	type: QOZBS_ACTION_TYPES.GET_QOZB_LOCATIONS
}

export interface ISetQozbLocationsAction {
	type: QOZBS_ACTION_TYPES.SET_QOZB_LOCATIONS
	data: IQozbLocation[]
}

export interface IDeleteQozbAction {
	type: QOZBS_ACTION_TYPES.DELETE_QOZB
	data: number | string
}

export interface ISetSelectedContactAction {
	type: QOZBS_ACTION_TYPES.SET_SELECTED_CONTACT
	data: Partial<IContact> | null
}

export interface ISetQozbContactsAction {
	type: QOZBS_ACTION_TYPES.SET_QOZB_CONTACTS
	data: Partial<IContact>[]
}

export interface IPutQozbContacstAction {
	type: QOZBS_ACTION_TYPES.PUT_QOZB_CONTACTS
	data: IPutQozbContactsData
}

export interface IDeleteQozbContactAction {
	type: QOZBS_ACTION_TYPES.DELETE_QOZB_CONTACT
	data: IDeleteQozbCOntactData
}

export interface IDeactivateQozbAction {
	type: QOZBS_ACTION_TYPES.DEACTIVATE_QOZB
	data: number | string
}
export interface IActivateQozbAction {
	type: QOZBS_ACTION_TYPES.ACTIVATE_QOZB
	data: number | string
}

export interface IGetAssetTypesAction {
	type: QOZBS_ACTION_TYPES.GET_ASSET_TYPES
}

export interface ISetAssetTypesAction {
	type: QOZBS_ACTION_TYPES.SET_ASSET_TYPES
	data: IAssetType[]
}

export interface IGetAllAssetsAction {
	type: QOZBS_ACTION_TYPES.GET_ALL_ASSETS
	data: IAllAssetsFilter
}

export interface ISetAllAssetsAction {
	type: QOZBS_ACTION_TYPES.SET_ALL_ASSETS
	data: QozbAllAssetsDataResponse<IAsset>
}

export interface IGetQozbAssetsAction {
	type: QOZBS_ACTION_TYPES.GET_QOZB_ASSETS
	data: string
}

export interface ISetQOZBAssetsAction {
	type: QOZBS_ACTION_TYPES.SET_QOZB_ASSETS
	data: IQozbAssetsResponse
}

export interface ISetAssetTypesAction {
	type: QOZBS_ACTION_TYPES.SET_ASSET_TYPES
	data: IAssetType[]
}

export interface IAddAssetAction {
	type: QOZBS_ACTION_TYPES.ADD_ASSET
	data: IQOZBAssetFilterandData
}

export interface IUpdateAssetAction {
	type: QOZBS_ACTION_TYPES.UPDATE_ASSET
	data: IQOZBAssetFilterandData
}

export interface IDeleteAssetAction {
	type: QOZBS_ACTION_TYPES.DELETE_ASSET
	data: IQOZBAssetFilter
}

export interface IActivateAssetAction {
	type: QOZBS_ACTION_TYPES.ACTIVATE_ASSET
	data: IQOZBAssetFilter
}

export interface IDeactivateAssetAction {
	type: QOZBS_ACTION_TYPES.DEACTIVATE_ASSET
	data: IQOZBAssetFilter
}

export interface IGetAssetDetailAction {
	type: QOZBS_ACTION_TYPES.GET_ASSET_DETAIL
	data: string
}

export interface ISetAssetDetailAction {
	type: QOZBS_ACTION_TYPES.SET_ASSET_DETAIL
	data: IAsset | null
}

export interface IQozbToggleLoadingAction {
	type: QOZBS_ACTION_TYPES.QOZB_TOGGLE_LOADING
}

export interface ISetAllAssetsFilterAction {
	type: QOZBS_ACTION_TYPES.SET_ALL_ASSETS_FILTER
	data: { name: string; data: any }
}

export interface IGetAssetQuestionsAction {
	type: QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS
	data: string
}

export interface ISetAssetQuestionsAction {
	type: QOZBS_ACTION_TYPES.SET_ASSET_QUESTIONS
	data: IQuestion[]
}

export interface ISetAssetRelationsAction {
	type: QOZBS_ACTION_TYPES.SET_ASSET_RELATIONS
	data: IAnyQuestions
}

export interface ICreateOrUpdateAssetRelationAction {
	type: QOZBS_ACTION_TYPES.CREATE_OR_UPDATE_ASSET_RELATIONS
	data: IAssetQuestionsCreateOrUpdateData
}

export type QozbActions =
	| IGetQozbsAction
	| IGetQozbsQuestionsAction
	| ISetQozbsQuestionsAction
	| ISetQozbsAction
	| ISetFilterAction
	| ICreateQozbAction
	| IEditQozbAction
	| IGetSingleQozbsAction
	| ISetSingleQozbAction
	| IDeleteAssetAction
	| IUpdateAssetAction
	| IAddAssetAction
	| ISetAllAssetsAction
	| IGetAllAssetsAction
	| ISetAssetTypesAction
	| IGetAssetTypesAction
	| IActivateQozbAction
	| IDeactivateQozbAction
	| IDeleteQozbContactAction
	| IPutQozbContacstAction
	| ISetQozbContactsAction
	| ISetSelectedContactAction
	| IDeleteQozbAction
	| ISetQozbLocationsAction
	| IGetQozbLocationsAction
	| IGetPropertyOwnersAction
	| IGetQozbEntityTypesAction
	| ISetQozbTypesAction
	| IGetQozbTypesAction
	| IGetAllQozbsAction
	| ISetAllQozbsAction
	| IQozbToggleLoadingAction
	| IGetAssetDetailAction
	| ISetAssetDetailAction
	| IActivateAssetAction
	| IDeactivateAssetAction
	| IGetQozbAssetsAction
	| ISetQOZBAssetsAction
	| IAddAssetAction
	| IUpdateAssetAction
	| ISetAllAssetsFilterAction
	| IGetAssetQuestionsAction
	| ISetAssetQuestionsAction
	| ISetAssetRelationsAction
	| ICreateOrUpdateAssetRelationAction
