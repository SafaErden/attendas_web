/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericActionCreator } from '../../shared/action/generic.action'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { errorHandlers } from '../../utils/service-error-handler'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { ICapzoneId, ICapzoneIdDetailInfoData, IQuestion } from './capzoneIds'
import {
	ICreateCapzoneIdAction,
	IEditCapzoneIdAction,
	IGetSingleCapzoneIdsAction,
	IGetCapzoneIdsAction,
	ISetSingleCapzoneIdAction,
	ISetCapzoneIdsAction,
	CAPZONEIDS_ACTION_TYPES,
	IDeleteCapzoneIdAction,
	ISetAllQozbsAction,
	ISetAllFundsAction,
	ISetAllInvestorsAction,
	ISetAllUsersAction,
	IGetCapzoneIdDetailInfoAction,
	ISetCapzoneIdDetailInfoAction,
	ICapZonetoggleLoadingAction,
	IUpdateInvestorQuestionsAction,
	IGetInvestorQuestionsAction,
	ISetInvestorQuestionsAction,
	ISetIsRelationAction,
	IUpdateQOZBQuestionsAction,
	IGetQOZBQuestionsAction,
	ISetQOZBQuestionsAction,
	IGetCapzoneIdsWithIdAction,
	IDeactivateCapzoneIdAction,
	IActivateCapzoneIdAction,
} from './capzoneIds.actions'
import {
	createCapzoneId,
	createInvestorrelation,
	createQOZBrelation,
	activateCapzoneId,
	deactivateCapzoneId,
	deleteCapzoneId,
	editCapzoneId,
	getAllFunds,
	getAllInvestors,
	getAllQozbs,
	getAllUsers,
	getCapzoneId,
	getCapzoneIds,
	getCZIDWithId,
	getInvestorRelations,
	getQOZBRelations,
	updateInvestorQuestions,
	updateQOZBQuestions,
} from '../../services/capzoneIds.services'
import * as qs from 'qs'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { push } from 'redux-first-history'
import { toast } from 'react-toastify'
import { IGlobalState } from '../../redux/reducers'
import { IQOZB } from '../QOZBS/qozbs'
import { IFund } from '../Funds/funds'
import { IInvestor } from '../Investors/investors'
import { getFund } from '../../services/funds.services'
import { getQozb } from '../../services/qozbs.service'
import { getInvestor } from '../../services/investors.services'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

function* GetCapzoneIdsSaga({ data }: IGetCapzoneIdsAction) {
	const qsData = {
		...data,
		...(data.investor ? { investor: `${data?.investor}`?.split(' ')?.[0] } : {}),
	}
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const CapzoneIdsData: DataResponse<ICapzoneId> = yield serviceWrapperSaga(
			getCapzoneIds,
			errorHandlers,
			qs.stringify(qsData),
		)

		if (CapzoneIdsData) {
			yield put(
				GenericActionCreator<ISetCapzoneIdsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS,
					data: CapzoneIdsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS,
				data: {
					count: 0,
					capZoneIDs: [],
				},
			}),
		)
	}
}

function* GetCapzoneIdsWithIdSaga({ data }: IGetCapzoneIdsWithIdAction) {
	const qsData = {
		page: data.page,
		size: data.size,
	}
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const CapzoneIdsData: DataResponse<ICapzoneId> = yield serviceWrapperSaga(getCZIDWithId, errorHandlers, {
			query: qs.stringify(qsData),
			type: data.type,
			id: data.fundId || data.qozbId || data.investorId,
		})

		if (CapzoneIdsData) {
			yield put(
				GenericActionCreator<ISetCapzoneIdsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS,
					data: CapzoneIdsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEIDS,
				data: {
					count: 0,
					capZoneIDs: [],
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* CreateCapzoneIdSaga({ data }: ICreateCapzoneIdAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(createCapzoneId, errorHandlers, data)

		yield put(push(MAIN_ROUTES.CAPZONE_IDS))
		toast.success('Succesfully created the CapzoneId')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

function* EditCapzoneIdSaga({ data }: IEditCapzoneIdAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(editCapzoneId, errorHandlers, data)

		yield put(push(`/capzoneids/detail/${data.capZoneId}`))
		toast.success('Succesfully edited the CapzoneId')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetSingleCapzoneIdSaga({ data }: IGetSingleCapzoneIdsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const capzoneId: ICapzoneId = yield serviceWrapperSaga(getCapzoneId, errorHandlers, data)
		yield put(
			GenericActionCreator<ISetSingleCapzoneIdAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID,
				data: capzoneId,
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSingleCapzoneIdAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID,
				data: null,
			}),
		)
		yield put(push(MAIN_ROUTES.CAPZONE_IDS))
		toast.error('There was an error with the CapzoneId data')
	}
}

function* DeleteCapzoneIdSaga({ data }: IDeleteCapzoneIdAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deleteCapzoneId, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.capzoneIds.filter)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const capZoneIds = yield select((state: IGlobalState) => state.capzoneIds)
		const capzoneIdNumber = capZoneIds.capZoneIDs.length - 1
		yield put(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'capzoneIds',
					pageNumber: capZoneIds.page === 1 ? 1 : capzoneIdNumber > 0 ? capZoneIds.page : capZoneIds.page - 1,
				},
			}),
		)
		yield put(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: {
					...filter,
					page: capZoneIds.page === 1 ? 1 : capzoneIdNumber > 0 ? capZoneIds.page : capZoneIds.page - 1,
				},
			}),
		)
		yield put(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))

		toast.success('Succesfully deleted the CapzoneId')
	} catch (e) {
		yield put(
			GenericActionCreator<ICapZonetoggleLoadingAction>({
				type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}

function* ActivateCapzoneIdSaga({ data }: IActivateCapzoneIdAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(activateCapzoneId, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.capzoneIds.filter)
		yield put(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: filter,
			}),
		)

		toast.success('Succesfully activated the CapzoneId')
	} catch (e) {
		yield put(
			GenericActionCreator<ICapZonetoggleLoadingAction>({
				type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}
function* DeactivateCapzoneIdSaga({ data }: IDeactivateCapzoneIdAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deactivateCapzoneId, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.capzoneIds.filter)
		yield put(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: filter,
			}),
		)

		toast.success('Succesfully deactivated the CapzoneId')
	} catch (e) {
		yield put(
			GenericActionCreator<ICapZonetoggleLoadingAction>({
				type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING,
			}),
		)
		console.log(e)
	}
}

function* GetAllQozbsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const QozbsData: DataResponse<IQOZB> = yield serviceWrapperSaga(getAllQozbs, errorHandlers)

		if (QozbsData) {
			yield put(
				GenericActionCreator<ISetAllQozbsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_ALL_QOZBS,
					data: QozbsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAllQozbsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_ALL_QOZBS,
				data: [],
			}),
		)
	}
}

function* GetAllFundsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const FundsData: DataResponse<IFund> = yield serviceWrapperSaga(getAllFunds, errorHandlers)

		if (FundsData) {
			yield put(
				GenericActionCreator<ISetAllFundsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_ALL_FUNDS,
					data: FundsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAllFundsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_ALL_FUNDS,
				data: [],
			}),
		)
	}
}

function* GetAllInvestorsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const InvestorsData: DataResponse<IInvestor> = yield serviceWrapperSaga(getAllInvestors, errorHandlers)

		if (InvestorsData) {
			yield put(
				GenericActionCreator<ISetAllInvestorsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_ALL_INVESTORS,
					data: InvestorsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAllInvestorsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_ALL_INVESTORS,
				data: [],
			}),
		)
	}
}

function* GetAllUsersSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const usersData: DataResponse<IInvestor> = yield serviceWrapperSaga(getAllUsers, errorHandlers)

		if (usersData) {
			yield put(
				GenericActionCreator<ISetAllUsersAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_ALL_USERS,
					data: usersData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetAllUsersAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_ALL_USERS,
				data: [],
			}),
		)
	}
}

function* GetCapzoneIdDetailInfoSaga({ data }: IGetCapzoneIdDetailInfoAction) {
	try {
		const res: ICapzoneIdDetailInfoData = yield all({
			fund: call(getFund, data.fund.fundId),

			qozb: call(getQozb, data.business.businessId),

			investor: call(getInvestor, data.investor.investorId),
		})

		yield put(
			GenericActionCreator<ISetCapzoneIdDetailInfoAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID_DETAIL_INFO,
				data: res,
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetCapzoneIdDetailInfoAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID_DETAIL_INFO,
				data: {},
			}),
		)
	}
}

function* getInvestorQuestionsSaga({ data }: IGetInvestorQuestionsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const result = yield serviceWrapperSaga(getInvestorRelations, errorHandlers, data)

		if (result?.relations?.length) {
			yield put(
				GenericActionCreator<ISetInvestorQuestionsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_INVESTOR_QUESTIONS,
					data: result.relations,
				}),
			)

			yield put(
				GenericActionCreator<ISetIsRelationAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_IS_RELATION,
					data: (result?.relations ?? []).some((answer: IQuestion) => {
						return (
							!!answer?.values.find((val) => val.id === 'value')?.value ||
							!!answer?.values.find((val) => val.id === 'multiValue')?.value ||
							!!answer.options?.some((opt) => opt.value)
						)
					}),
				}),
			)
		}
	} catch (e) {
		console.error(e)
		yield put(
			GenericActionCreator<ISetInvestorQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_INVESTOR_QUESTIONS,
				data: [],
			}),
		)
	}
}

function* updateInvestorQuestionsSaga({ data }: IUpdateInvestorQuestionsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const isRelation = yield select((state: IGlobalState) => state.capzoneIds.isRelation)

		if (isRelation) {
			yield serviceWrapperSaga(updateInvestorQuestions, errorHandlers, data)
		} else {
			yield serviceWrapperSaga(createInvestorrelation, errorHandlers, data)
		}

		yield put(push(`/capzoneIds/detail/${data.czidId}`))

		yield put(
			GenericActionCreator<IGetInvestorQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_INVESTOR_QUESTIONS,
				data: data.czidId,
			}),
		)
	} catch (e) {
		console.error(e)
		yield put(
			GenericActionCreator<ICapZonetoggleLoadingAction>({
				type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING,
			}),
		)
	}
}

function* getQOZBQuestionsSaga({ data }: IGetQOZBQuestionsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const result = yield serviceWrapperSaga(getQOZBRelations, errorHandlers, data)

		if (result?.relations?.length) {
			yield put(
				GenericActionCreator<ISetQOZBQuestionsAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_QOZB_QUESTIONS,
					data: result.relations,
				}),
			)

			yield put(
				GenericActionCreator<ISetIsRelationAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_IS_RELATION,
					data: (result?.relations ?? []).some((answer: IQuestion) => {
						return (
							!!answer?.values.find((val) => val.id === 'value')?.value ||
							!!answer?.values.find((val) => val.id === 'multiValue')?.value ||
							!!answer.options?.some((opt) => opt.value)
						)
					}),
				}),
			)
		}
	} catch (e) {
		console.error(e)
		yield put(
			GenericActionCreator<ISetQOZBQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_QOZB_QUESTIONS,
				data: [],
			}),
		)
	}
}

function* updateQOZBQuestionsSaga({ data }: IUpdateQOZBQuestionsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const isRelation = yield select((state: IGlobalState) => state.capzoneIds.isRelation)

		if (isRelation) {
			yield serviceWrapperSaga(updateQOZBQuestions, errorHandlers, data)
		} else {
			yield serviceWrapperSaga(createQOZBrelation, errorHandlers, data)
		}

		yield put(push(`/capzoneIds/detail/${data.czidId}`))

		yield put(
			GenericActionCreator<IGetQOZBQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_QOZB_QUESTIONS,
				data: data.czidId,
			}),
		)
	} catch (e) {
		console.error(e)
		yield put(
			GenericActionCreator<ICapZonetoggleLoadingAction>({
				type: CAPZONEIDS_ACTION_TYPES.CAPZONEID_TOGGLE_LOADING,
			}),
		)
	}
}

/**
 * CapzoneIdModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* CapzoneIdModuleSaga(): Generator {
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS, GetCapzoneIdsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.CREATE_CAPZONEID, CreateCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.EDIT_CAPZONEID, EditCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID, GetSingleCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.DELETE_CAPZONEID, DeleteCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.ACTIVATE_CAPZONEID, ActivateCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.DEACTIVATE_CAPZONEID, DeactivateCapzoneIdSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_ALL_QOZBS, GetAllQozbsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_ALL_FUNDS, GetAllFundsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_ALL_INVESTORS, GetAllInvestorsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_ALL_USERS, GetAllUsersSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID_DETAIL_INFO, GetCapzoneIdDetailInfoSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_INVESTOR_QUESTIONS, getInvestorQuestionsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.UPDATE_INVESTOR_QUESTIONS, updateInvestorQuestionsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_QOZB_QUESTIONS, getQOZBQuestionsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.UPDATE_QOZB_QUESTIONS, updateQOZBQuestionsSaga)
	yield takeLatest(CAPZONEIDS_ACTION_TYPES.GET_CZIDS_WITH_ID, GetCapzoneIdsWithIdSaga)
}
