/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericActionCreator } from '../../shared/action/generic.action'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { errorHandlers } from '../../utils/service-error-handler'
import { put, takeLatest, select } from 'redux-saga/effects'
import { IAsset, IAssetType, IBussinesType, IQOZB, IQozbAssetsResponse, IQozbLocation } from './qozbs'
import {
	ICreateQozbAction,
	IEditQozbAction,
	IGetSingleQozbsAction,
	IGetQozbsAction,
	ISetSingleQozbAction,
	ISetQozbsAction,
	ISetQozbsQuestionsAction,
	QOZBS_ACTION_TYPES,
	IDeleteQozbAction,
	IActivateQozbAction,
	IDeactivateQozbAction,
	ISetQozbTypesAction,
	ISetQozbLocationsAction,
	IPutQozbContacstAction,
	IDeleteQozbContactAction,
	ISetQozbContactsAction,
	IQozbToggleLoadingAction,
	ISetAssetTypesAction,
	IGetAllAssetsAction,
	ISetAllAssetsAction,
	IGetQozbAssetsAction,
	ISetQOZBAssetsAction,
	IGetAssetDetailAction,
	ISetAssetDetailAction,
	QozbAllAssetsDataResponse,
	IAddAssetAction,
	IUpdateAssetAction,
	IDeactivateAssetAction,
	IActivateAssetAction,
	IDeleteAssetAction,
	IGetAssetQuestionsAction,
	ISetAssetRelationsAction,
	ISetAssetQuestionsAction,
	ICreateOrUpdateAssetRelationAction,
} from './qozbs.actions'
import {
	activateAsset,
	createAsset,
	createAssetRelation,
	createQozb,
	deactivateAsset,
	activateQozb,
	deactivateQozb,
	deleteAsset,
	deleteQozb,
	deleteQozbContact,
	editQozb,
	getAllAssets,
	getAssetDetail,
	getAssetRelation,
	getAssetTypes,
	getQozb,
	getQozbQuestions,
	getQozbAssets,
	getQozbLocations,
	getQozbs,
	getQozbTypes,
	updateAsset,
	updateAssetRelation,
	updateQozbContacts,
	createQozbQuestionAnswers,
	editQozbQuestionAnswers,
	getQozbQuestionAnswers,
} from '../../services/qozbs.service'
import * as qs from 'qs'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { push } from 'redux-first-history'
import { toast } from 'react-toastify'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { IContact } from '../Funds/funds'
import { IGlobalState } from '@src/redux/reducers'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetQozbsSaga({ data, type }: IGetQozbsAction) {
	try {
		const qsObject = {
			...data,
			location: data.location?.state,
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const QozbsData = yield serviceWrapperSaga(getQozbs, errorHandlers, qs.stringify(qsObject))

		if (QozbsData) {
			yield put(
				GenericActionCreator<ISetQozbsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZBS,
					data: QozbsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetQozbsAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZBS,
				data: {
					count: 0,
					qozbs: [],
				},
			}),
		)
	}
}

function* GetQozbQuestionsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const QozbsQuestionsData: any = yield serviceWrapperSaga(getQozbQuestions, errorHandlers)

		if (QozbsQuestionsData) {
			yield put(
				GenericActionCreator<ISetQozbsQuestionsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZBS_QUESTIONS,
					data: QozbsQuestionsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetQozbsQuestionsAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZBS_QUESTIONS,
				data: [],
			}),
		)
	}
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* CreateQozbSaga({ data }: ICreateQozbAction) {
	const { answers, ...rest } = data
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const qozbInitialData = yield serviceWrapperSaga(createQozb, errorHandlers, rest)
		if (qozbInitialData) {
			const { businessId } = qozbInitialData
			const data = { businessId: businessId, answers: answers }
			yield serviceWrapperSaga(createQozbQuestionAnswers, errorHandlers, data)
		}
		yield put(push(MAIN_ROUTES.QOZBS))
		toast.success('Succesfully created the Qozb')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

function* EditQozbSaga({ data }: IEditQozbAction) {
	const { businessId, answers } = data
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(editQozb, errorHandlers, data)
		yield serviceWrapperSaga(editQozbQuestionAnswers, errorHandlers, { businessId: businessId, answers: answers })
		yield put(push(`/qozbs/detail/${data.businessId}`))
		toast.success('Succesfully edited the Qozb')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetSingleQozbSaga({ data }: IGetSingleQozbsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Qozb: IQOZB = yield serviceWrapperSaga(getQozb, errorHandlers, data)
		const qozbAnswers: Partial<IQOZB> = yield serviceWrapperSaga(getQozbQuestionAnswers, errorHandlers, data)
		const { answers } = qozbAnswers
		yield put(
			GenericActionCreator<ISetSingleQozbAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZB,
				data: { ...Qozb, answers: answers },
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSingleQozbAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZB,
				data: null,
			}),
		)
		yield put(push(MAIN_ROUTES.QOZBS))
		toast.error('There was an error with the Qozb data')
	}
}

function* DeleteQozbSaga({ data }: IDeleteQozbAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deleteQozb, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.filter)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const qozbs = yield select((state: IGlobalState) => state.qozbs)
		const qozbsNumber = qozbs.qozbs.length - 1
		yield put(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'qozbs',
					pageNumber: qozbs.page === 1 ? 1 : qozbsNumber > 0 ? qozbs.page : qozbs.page - 1,
				},
			}),
		)
		yield put(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: { ...filter, page: qozbs.page === 1 ? 1 : qozbsNumber > 0 ? qozbs.page : qozbs.page - 1 },
			}),
		)
		yield put(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))

		toast.success('Succesfully deleted the qozb')
	} catch (e) {
		yield put(
			GenericActionCreator<IQozbToggleLoadingAction>({
				type: QOZBS_ACTION_TYPES.QOZB_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}

function* ActivateQozbSaga({ data }: IActivateQozbAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(activateQozb, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.filter)
		yield put(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: filter,
			}),
		)

		toast.success('Succesfully activated the qozb')
	} catch (e) {
		yield put(
			GenericActionCreator<IQozbToggleLoadingAction>({
				type: QOZBS_ACTION_TYPES.QOZB_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}
function* DeactivateQozbSaga({ data }: IDeactivateQozbAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deactivateQozb, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.filter)
		yield put(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: filter,
			}),
		)

		toast.success('Succesfully deactivated the qozb')
	} catch (e) {
		yield put(
			GenericActionCreator<IQozbToggleLoadingAction>({
				type: QOZBS_ACTION_TYPES.QOZB_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}

function* DeactivateAssetSaga({ data }: IDeactivateAssetAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deactivateAsset, errorHandlers, data)
		yield put(
			GenericActionCreator<IGetQozbAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ASSETS,
				data: data.qozbId,
			}),
		)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const currentPage = yield select((state: IGlobalState) => state.pagination.assets.currentPage)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.allAssetsFilter)

		yield put(
			GenericActionCreator<IGetAllAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_ALL_ASSETS,
				data: {
					...filter,
					page: currentPage,
				},
			}),
		)

		toast.success('Succesfully deactivated the asset')
	} catch (e) {
		console.log(e)
	}
}

function* ActivateAssetSaga({ data }: IActivateAssetAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(activateAsset, errorHandlers, data)
		yield put(
			GenericActionCreator<IGetQozbAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ASSETS,
				data: data.qozbId,
			}),
		)

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const currentPage = yield select((state: IGlobalState) => state.pagination.assets.currentPage)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.allAssetsFilter)

		yield put(
			GenericActionCreator<IGetAllAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_ALL_ASSETS,
				data: {
					...filter,
					page: currentPage,
				},
			}),
		)

		toast.success('Succesfully activated the asset')
	} catch (e) {
		console.log(e)
	}
}

function* GetQozbTypesSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: IBussinesType[] = yield serviceWrapperSaga(getQozbTypes, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetQozbTypesAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_TYPES,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZB_TYPES,
				data: [],
			}),
		)
	}
}

function* GetLocationsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: IQozbLocation[] = yield serviceWrapperSaga(getQozbLocations, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetQozbLocationsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_LOCATIONS,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetQozbLocationsAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZB_LOCATIONS,
				data: [],
			}),
		)
	}
}

function* PutQozbContactsSaga({ data }: IPutQozbContacstAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(updateQozbContacts, errorHandlers, data)
		yield put(toggleModalVisibility(MODAL_NAMES.QOZB_CONTACT))

		yield put(
			GenericActionCreator<IGetSingleQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB,
				data: data.businessId,
			}),
		)
	} catch (e) {
		console.log(e)
	}
}

function* DeleteQozbContactSaga({ data }: IDeleteQozbContactAction) {
	try {
		// eslint-disable-next-line no-debugger
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const contacts = yield select((state: IGlobalState) => state.qozbs.contacts)

		if (data.businessId) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			yield serviceWrapperSaga(deleteQozbContact, errorHandlers, data)
			yield put(
				GenericActionCreator<IGetSingleQozbsAction>({
					type: QOZBS_ACTION_TYPES.GET_QOZB,
					data: data.businessId,
				}),
			)
		} else {
			const newContacts = contacts.filter((contact: Partial<IContact>) => contact.tempId !== data.contactId)
			yield put(
				GenericActionCreator<ISetQozbContactsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_CONTACTS,
					data: newContacts,
				}),
			)
		}
	} catch (e) {
		console.log(e)
	}
}

function* GetAssetTypesSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: IAssetType[] = yield serviceWrapperSaga(getAssetTypes, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetAssetTypesAction>({
					type: QOZBS_ACTION_TYPES.SET_ASSET_TYPES,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAssetTypesAction>({
				type: QOZBS_ACTION_TYPES.SET_ASSET_TYPES,
				data: [],
			}),
		)
	}
}

function* GetAllAssetsSaga({ data }: IGetAllAssetsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const AllAssets: QozbAllAssetsDataResponse<IAsset> = yield serviceWrapperSaga(
			getAllAssets,
			errorHandlers,
			qs.stringify(data),
		)

		if (AllAssets) {
			yield put(
				GenericActionCreator<ISetAllAssetsAction>({
					type: QOZBS_ACTION_TYPES.SET_ALL_ASSETS,
					data: AllAssets,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAllAssetsAction>({
				type: QOZBS_ACTION_TYPES.SET_ALL_ASSETS,
				data: {
					count: 0,
					assets: [],
				},
			}),
		)
	}
}

function* GetQozbAssetsSaga({ data }: IGetQozbAssetsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const assets: IQozbAssetsResponse = yield serviceWrapperSaga(getQozbAssets, errorHandlers, data)

		if (assets) {
			yield put(
				GenericActionCreator<ISetQOZBAssetsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_ASSETS,
					data: assets,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetQOZBAssetsAction>({
				type: QOZBS_ACTION_TYPES.SET_QOZB_ASSETS,
				data: {
					bussinessId: '',
					count: 0,
					assets: [],
				},
			}),
		)
	}
}

function* GetAssetDetailSaga({ data }: IGetAssetDetailAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const assetDetail: IAsset = yield serviceWrapperSaga(getAssetDetail, errorHandlers, data)

		if (assetDetail) {
			yield put(
				GenericActionCreator<ISetAssetDetailAction>({
					type: QOZBS_ACTION_TYPES.SET_ASSET_DETAIL,
					data: assetDetail,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAssetDetailAction>({
				type: QOZBS_ACTION_TYPES.SET_ASSET_DETAIL,
				data: null,
			}),
		)
	}
}

function* CreateAssetSaga({ data }: IAddAssetAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const res = yield serviceWrapperSaga(createAsset, errorHandlers, data)

		yield put(push(`/qozbs/${data.qozbId}/assets/detail/${res.assetId}`))
		toast.success('Succesfully created the Asset')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetAssetDetailAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_DETAIL,
				data: data.assetId ?? '',
			}),
		)
	}
}

function* UpdateAssetSaga({ data }: IUpdateAssetAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(updateAsset, errorHandlers, data)

		yield put(push(`/qozbs/${data.qozbId}/assets/detail/${data.assetId}`))
		toast.success('Succesfully updated the Asset')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetAssetDetailAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_DETAIL,
				data: data.assetId ?? '',
			}),
		)
	}
}

function* DeleteAssetSaga({ data }: IDeleteAssetAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.qozbs.allAssetsFilter)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const assets = yield select((state: IGlobalState) => state.qozbs.allAssets)
		const assetsNumber = assets.assets.length - 1
		yield serviceWrapperSaga(deleteAsset, errorHandlers, data)

		yield put(
			GenericActionCreator<IGetQozbAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ASSETS,
				data: data.qozbId,
			}),
		)

		yield put(
			GenericActionCreator<IGetAllAssetsAction>({
				type: QOZBS_ACTION_TYPES.GET_ALL_ASSETS,
				data: { ...filter, page: assets.page === 1 ? 1 : assetsNumber > 0 ? assets.page : assets.page - 1 },
			}),
		)
		yield put(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'assets',
					pageNumber: assets.page === 1 ? 1 : assetsNumber > 0 ? assets.page : assets.page - 1,
				},
			}),
		)
		yield put(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))

		toast.success('Succesfully deleted the asset')
	} catch (e) {
		console.log(e)
	}
}

function* GetAssetQuestionsSaga({ data }: IGetAssetQuestionsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const result = yield serviceWrapperSaga(getAssetRelation, errorHandlers, data)

		yield put(
			GenericActionCreator<ISetAssetQuestionsAction>({
				type: QOZBS_ACTION_TYPES.SET_ASSET_QUESTIONS,
				data: result?.answers,
			}),
		)

		if (result?.answers?.length) {
			yield put(
				GenericActionCreator<ISetAssetRelationsAction>({
					type: QOZBS_ACTION_TYPES.SET_ASSET_RELATIONS,
					data: {
						...result,
						answers: result.answers,
					},
				}),
			)
		}
	} catch (e) {
		console.error(e)
		yield put(
			GenericActionCreator<ISetAssetQuestionsAction>({
				type: QOZBS_ACTION_TYPES.SET_ASSET_QUESTIONS,
				data: [],
			}),
		)
	}
}

function* CreateOrUpdateAssetRelationsSaga({ data }: ICreateOrUpdateAssetRelationAction) {
	try {
		const { isRelation, qozbId, ...rest } = data

		if (isRelation) {
			yield serviceWrapperSaga(updateAssetRelation, errorHandlers, data)
		} else {
			yield serviceWrapperSaga(createAssetRelation, errorHandlers, data)
		}
		yield put(
			GenericActionCreator<IGetAssetQuestionsAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS,
				data: rest.assetId,
			}),
		)

		yield put(push(`/qozbs/${qozbId}/assets/detail/${data.assetId}`))
	} catch (e) {
		yield put(
			GenericActionCreator<IGetAssetQuestionsAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS,
				data: data.assetId,
			}),
		)
		console.error(e)
	}
}

/**
 * QozbModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* QozbModuleSaga(): Generator {
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZBS, GetQozbsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZBS_QUESTIONS, GetQozbQuestionsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.CREATE_QOZB, CreateQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.EDIT_QOZB, EditQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZB, GetSingleQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.DELETE_QOZB, DeleteQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.ACTIVATE_QOZB, ActivateQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.DEACTIVATE_QOZB, DeactivateQozbSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZB_TYPES, GetQozbTypesSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZB_LOCATIONS, GetLocationsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.PUT_QOZB_CONTACTS, PutQozbContactsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.DELETE_QOZB_CONTACT, DeleteQozbContactSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_ASSET_TYPES, GetAssetTypesSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_ALL_ASSETS, GetAllAssetsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_QOZB_ASSETS, GetQozbAssetsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_ASSET_DETAIL, GetAssetDetailSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.ADD_ASSET, CreateAssetSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.UPDATE_ASSET, UpdateAssetSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.DEACTIVATE_ASSET, DeactivateAssetSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.ACTIVATE_ASSET, ActivateAssetSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.DELETE_ASSET, DeleteAssetSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS, GetAssetQuestionsSaga)
	yield takeLatest(QOZBS_ACTION_TYPES.CREATE_OR_UPDATE_ASSET_RELATIONS, CreateOrUpdateAssetRelationsSaga)
}
