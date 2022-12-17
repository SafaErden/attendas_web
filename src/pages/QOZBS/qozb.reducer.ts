/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuestion } from '../CapzoneIds/capzoneIds'
import { IContact } from '../Funds/funds'
import {
	IAllAssetsFilter,
	IAsset,
	IAnyQuestions,
	IAssetType,
	IBussinesType,
	IQOZB,
	IQozbAssetsResponse,
	IQozbFilter,
	IQozbLocation,
} from './qozbs'
import { QozbActions, QozbAllAssetsDataResponse, QozbDataResponse, QOZBS_ACTION_TYPES } from './qozbs.actions'

export interface IQozbsState {
	count: number
	qozbs: IQOZB[]
	qozbsQuestions: IQuestion[]
	loading: boolean
	filter: IQozbFilter
	selectedQozb: IQOZB | null
	assets: IQozbAssetsResponse
	allAssets: QozbAllAssetsDataResponse<IAsset>
	selectedAsset: IAsset | null
	assetsLoading: boolean
	contacts: Partial<IContact>[]
	locations: IQozbLocation[]

	qozbTypes: IBussinesType[]
	selectedContact: Partial<IContact> | null
	assetTypes: IAssetType[]
	allQozbs: QozbDataResponse<IQOZB>
	allAssetsFilter: IAllAssetsFilter
	assetQuestions: IQuestion[]
	assetRelations: IAnyQuestions
}

export const initialState: IQozbsState = {
	count: 0,
	qozbs: [],
	qozbsQuestions: [],
	loading: false,
	filter: {},
	selectedQozb: null,
	assets: {
		count: 0,
		assets: [],
		bussinessId: '',
	},
	assetsLoading: false,
	selectedAsset: null,
	contacts: [],
	locations: [],
	qozbTypes: [],
	selectedContact: null,
	assetTypes: [],
	allQozbs: {
		count: 0,
		qozbs: [],
	},
	allAssets: {
		count: 0,
		assets: [],
	},
	allAssetsFilter: {},
	assetQuestions: [],
	assetRelations: {
		assetId: '',
		answers: [] as any,
	},
}

export const QozbsReducer = (state: Readonly<IQozbsState> = initialState, action: QozbActions): IQozbsState => {
	switch (action.type) {
		case QOZBS_ACTION_TYPES.GET_QOZBS:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.GET_QOZBS_QUESTIONS:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.SET_QOZBS_QUESTIONS:
			return { ...state, qozbsQuestions: action.data, loading: false }
		case QOZBS_ACTION_TYPES.GET_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.SET_QOZB:
			return { ...state, selectedQozb: action.data, loading: false }
		case QOZBS_ACTION_TYPES.CREATE_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.EDIT_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.SET_QOZBS:
			return { ...state, loading: false, ...action.data }
		case QOZBS_ACTION_TYPES.SET_FILTER:
			return { ...state, filter: { ...state.filter, [action.data.name]: action.data.data } }
		case QOZBS_ACTION_TYPES.SET_QOZB_LOCATIONS:
			return { ...state, locations: action.data }
		case QOZBS_ACTION_TYPES.SET_QOZB_TYPES:
			return { ...state, qozbTypes: action.data }
		case QOZBS_ACTION_TYPES.SET_QOZB_CONTACTS:
			return { ...state, contacts: action.data, loading: false }
		case QOZBS_ACTION_TYPES.SET_SELECTED_CONTACT:
			return { ...state, selectedContact: action.data }
		case QOZBS_ACTION_TYPES.SET_ASSET_TYPES:
			return { ...state, assetTypes: action.data }
		case QOZBS_ACTION_TYPES.GET_ALL_ASSETS:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.SET_ALL_ASSETS:
			return { ...state, allAssets: action.data, assetsLoading: false }
		case QOZBS_ACTION_TYPES.GET_QOZB_ASSETS:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.SET_QOZB_ASSETS:
			return { ...state, assets: action.data, assetsLoading: false }
		case QOZBS_ACTION_TYPES.SET_ALL_QOZBS:
			return { ...state, allQozbs: action.data }
		case QOZBS_ACTION_TYPES.ADD_ASSET:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.DELETE_ASSET:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.UPDATE_ASSET:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.ACTIVATE_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.DEACTIVATE_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.DELETE_QOZB:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.PUT_QOZB_CONTACTS:
			return { ...state, loading: true }
		case QOZBS_ACTION_TYPES.DELETE_QOZB_CONTACT:
			if (!action.data.businessId) return { ...state, loading: true }
			return state
		case QOZBS_ACTION_TYPES.QOZB_TOGGLE_LOADING:
			return { ...state, loading: !state.loading }
		case QOZBS_ACTION_TYPES.GET_ASSET_DETAIL:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.SET_ASSET_DETAIL:
			return { ...state, selectedAsset: action.data, assetsLoading: false }
		case QOZBS_ACTION_TYPES.ACTIVATE_ASSET:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.DEACTIVATE_ASSET:
			return { ...state, assetsLoading: true }
		case QOZBS_ACTION_TYPES.SET_ALL_ASSETS_FILTER:
			return { ...state, allAssetsFilter: { ...state.filter, [action.data.name]: action.data.data } }
		case QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS:
			return { ...state, assetsLoading: false }
		case QOZBS_ACTION_TYPES.SET_ASSET_QUESTIONS:
			return { ...state, assetsLoading: false, assetQuestions: action.data }
		case QOZBS_ACTION_TYPES.SET_ASSET_RELATIONS:
			return { ...state, assetsLoading: false, assetRelations: action.data }
		case QOZBS_ACTION_TYPES.CREATE_OR_UPDATE_ASSET_RELATIONS:
			return { ...state, assetsLoading: true }
		default:
			return state
	}
}
