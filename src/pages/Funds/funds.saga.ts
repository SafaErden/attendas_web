/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericActionCreator } from '../../shared/action/generic.action'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { errorHandlers } from '../../utils/service-error-handler'
import { put, select, takeLatest } from 'redux-saga/effects'
import { IContact, IFund, IFundEntityType, IFundType, ILocation } from './funds'
import {
	ICreateFundAction,
	IEditFundAction,
	IGetSingleFundsAction,
	IGetFundsAction,
	ISetFundsQuestionsAction,
	ISetSingleFundAction,
	ISetFundsAction,
	FUNDS_ACTION_TYPES,
	IDeleteFundAction,
	ISetEntityTypesAction,
	ISetFundTypesAction,
	ISetLocationsAction,
	IPutFundContacstAction,
	IDeleteFundContactAction,
	ISetContactsAction,
	IFundsToggleLoadingAction,
	IDeactivateFundAction,
	IActivateFundAction,
} from './funds.actions'
import {
	createFund,
	createQuestionAnswers,
	activateFund,
	deactivateFund,
	deleteFund,
	deleteFundContact,
	editFund,
	editFundQuestionAnswers,
	getFund,
	getFundQuestionAnswers,
	getFundsQuestions,
	getFundEntityTypes,
	getFunds,
	getFundTypes,
	getLocations,
	putFundContacts,
} from '../../services/funds.services'
import * as qs from 'qs'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { push } from 'redux-first-history'
import { toast } from 'react-toastify'
import { IGlobalState } from '../../redux/reducers'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

function* GetFundsSaga({ data }: IGetFundsAction) {
	const qsData = {
		...data,
		type: data.type?.entityTypeId,
		location: data.location?.state,
	}
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const FundsData: DataResponse<IFund> = yield serviceWrapperSaga(getFunds, errorHandlers, qs.stringify(qsData))

		if (FundsData) {
			yield put(
				GenericActionCreator<ISetFundsAction>({
					type: FUNDS_ACTION_TYPES.SET_FUNDS,
					data: FundsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetFundsAction>({
				type: FUNDS_ACTION_TYPES.SET_FUNDS,
				data: {
					count: 0,
					funds: [],
				},
			}),
		)
	}
}
function* GetFundQuestionsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const FundsQuestionsData: any = yield serviceWrapperSaga(getFundsQuestions, errorHandlers)

		if (FundsQuestionsData) {
			yield put(
				GenericActionCreator<ISetFundsQuestionsAction>({
					type: FUNDS_ACTION_TYPES.SET_FUNDS_QUESTIONS,
					data: FundsQuestionsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetFundsQuestionsAction>({
				type: FUNDS_ACTION_TYPES.SET_FUNDS_QUESTIONS,
				data: [],
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* CreateFundSaga({ data }: ICreateFundAction) {
	const { answers, ...rest } = data
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const fundInitialData = yield serviceWrapperSaga(createFund, errorHandlers, rest)
		if (fundInitialData) {
			const { fundId } = fundInitialData
			const data = { fundId: fundId, answers: answers }
			yield serviceWrapperSaga(createQuestionAnswers, errorHandlers, data)
		}
		yield put(push(MAIN_ROUTES.FUNDS))
		toast.success('Succesfully created the fund')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

function* EditFundSaga({ data }: IEditFundAction) {
	const { fundId, answers } = data
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(editFund, errorHandlers, data)
		yield serviceWrapperSaga(editFundQuestionAnswers, errorHandlers, { fundId: fundId, answers: answers })

		yield put(push(`/funds/detail/${data.fundId}`))
		toast.success('Succesfully edited the fund')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetSingleFundSaga({ data }: IGetSingleFundsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const fund: IFund = yield serviceWrapperSaga(getFund, errorHandlers, data)
		const fundAnswers: Partial<IFund> = yield serviceWrapperSaga(getFundQuestionAnswers, errorHandlers, data)
		const { answers } = fundAnswers
		yield put(
			GenericActionCreator<ISetSingleFundAction>({
				type: FUNDS_ACTION_TYPES.SET_FUND,
				data: { ...fund, answers: answers },
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSingleFundAction>({
				type: FUNDS_ACTION_TYPES.SET_FUND,
				data: null,
			}),
		)
		yield put(push(MAIN_ROUTES.FUNDS))
		toast.error('There was an error with the fund data')
	}
}

function* DeleteFundSaga({ data }: IDeleteFundAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deleteFund, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.funds.filter)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const funds = yield select((state: IGlobalState) => state.funds)
		const fundNumber = funds.funds.length - 1
		yield put(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'funds',
					pageNumber: funds.page === 1 ? 1 : fundNumber > 0 ? funds.page : funds.page - 1,
				},
			}),
		)
		yield put(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: { ...filter, page: funds.page === 1 ? 1 : fundNumber > 0 ? funds.page : funds.page - 1 },
			}),
		)
		yield put(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))

		toast.success('Succesfully deleted the fund')
	} catch (e) {
		yield put(
			GenericActionCreator<IFundsToggleLoadingAction>({
				type: FUNDS_ACTION_TYPES.FUNDS_TOGGLE_LODING,
			}),
		)
		console.log(e)
	}
}

function* ActivateFundSaga({ data }: IActivateFundAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(activateFund, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.funds.filter)
		yield put(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: filter,
			}),
		)

		toast.success('Succesfully activated the fund')
	} catch (e) {
		yield put(
			GenericActionCreator<IFundsToggleLoadingAction>({
				type: FUNDS_ACTION_TYPES.FUNDS_TOGGLE_LODING,
			}),
		)
		console.log(e)
	}
}
function* DeactivateFundSaga({ data }: IDeactivateFundAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deactivateFund, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.funds.filter)
		yield put(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: filter,
			}),
		)

		toast.success('Succesfully deactivated the fund')
	} catch (e) {
		yield put(
			GenericActionCreator<IFundsToggleLoadingAction>({
				type: FUNDS_ACTION_TYPES.FUNDS_TOGGLE_LODING,
			}),
		)
		console.log(e)
	}
}

function* GetFundEntityTypesSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: IFundEntityType[] = yield serviceWrapperSaga(getFundEntityTypes, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetEntityTypesAction>({
					type: FUNDS_ACTION_TYPES.SET_ENTITY_TYPES,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetEntityTypesAction>({
				type: FUNDS_ACTION_TYPES.SET_ENTITY_TYPES,
				data: [],
			}),
		)
	}
}

function* GetFundTypesSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: IFundType[] = yield serviceWrapperSaga(getFundTypes, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetFundTypesAction>({
					type: FUNDS_ACTION_TYPES.SET_FUND_TYPES,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetFundTypesAction>({
				type: FUNDS_ACTION_TYPES.SET_FUND_TYPES,
				data: [],
			}),
		)
	}
}

function* GetLocationsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: ILocation[] = yield serviceWrapperSaga(getLocations, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetLocationsAction>({
					type: FUNDS_ACTION_TYPES.SET_LOCATIONS,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetLocationsAction>({
				type: FUNDS_ACTION_TYPES.SET_LOCATIONS,
				data: [],
			}),
		)
	}
}

function* PutFundContactsSaga({ data }: IPutFundContacstAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(putFundContacts, errorHandlers, data)
		yield put(toggleModalVisibility(MODAL_NAMES.CONTACT))

		yield put(
			GenericActionCreator<IGetSingleFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUND,
				data: data.fundId,
			}),
		)
	} catch (e) {
		console.log(e)
	}
}

function* DeleteFundContactSaga({ data }: IDeleteFundContactAction) {
	try {
		// eslint-disable-next-line no-debugger
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const contacts = yield select((state: IGlobalState) => state.funds.contacts)

		if (data.fundId) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			yield serviceWrapperSaga(deleteFundContact, errorHandlers, data)
			yield put(
				GenericActionCreator<IGetSingleFundsAction>({
					type: FUNDS_ACTION_TYPES.GET_FUND,
					data: data.fundId,
				}),
			)
		} else {
			const newContacts = contacts.filter((contact: Partial<IContact>) => contact.tempId !== data.contactId)
			yield put(
				GenericActionCreator<ISetContactsAction>({
					type: FUNDS_ACTION_TYPES.SET_CONTACTS,
					data: newContacts,
				}),
			)
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 * FundModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* FundModuleSaga(): Generator {
	yield takeLatest(FUNDS_ACTION_TYPES.GET_FUNDS, GetFundsSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.GET_FUNDS_QUESTIONS, GetFundQuestionsSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.CREATE_FUND, CreateFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.EDIT_FUND, EditFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.GET_FUND, GetSingleFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.DELETE_FUND, DeleteFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.ACTIVATE_FUND, ActivateFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.DEACTIVATE_FUND, DeactivateFundSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.GET_ENTITY_TYPES, GetFundEntityTypesSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.GET_FUND_TYPES, GetFundTypesSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.GET_LOCATIONS, GetLocationsSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.PUT_FUND_CONTACTS, PutFundContactsSaga)
	yield takeLatest(FUNDS_ACTION_TYPES.DELETE_FUND_CONTACT, DeleteFundContactSaga)
}
