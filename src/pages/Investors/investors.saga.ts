/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericActionCreator } from '../../shared/action/generic.action'
import { serviceWrapperSaga } from '../../shared/saga/service-wrapper.saga'
import { errorHandlers } from '../../utils/service-error-handler'
import { put, select, takeLatest } from 'redux-saga/effects'
import { IInvestor, ILocation } from './investors'
import {
	ICreateInvestorAction,
	IEditInvestorAction,
	IGetSingleInvestorsAction,
	IGetInvestorsAction,
	ISetSingleInvestorAction,
	ISetInvestorsAction,
	INVESTORS_ACTION_TYPES,
	IDeleteInvestorAction,
	ISetInvestorLocationsAction,
	IPutInvestorContacstAction,
	IDeleteInvestorContactAction,
	ISetContactsAction,
	IInvestorsToggleLoadingAction,
} from './investors.actions'
import {
	createInvestor,
	deleteInvestor,
	deleteInvestorContact,
	editInvestor,
	getInvestor,
	getInvestors,
	getLocations,
	putInvestorContacts,
} from '../../services/investors.services'
import * as qs from 'qs'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { push } from 'redux-first-history'
import { toast } from 'react-toastify'
import { IGlobalState } from '../../redux/reducers'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { IContact } from '../Funds/funds'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

function* GetInvestorsSaga({ data }: IGetInvestorsAction) {
	const qsData = {
		...data,
		location: data.location?.state,
	}
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const InvestorsData: DataResponse<IInvestor> = yield serviceWrapperSaga(
			getInvestors,
			errorHandlers,
			qs.stringify(qsData),
		)

		if (InvestorsData) {
			yield put(
				GenericActionCreator<ISetInvestorsAction>({
					type: INVESTORS_ACTION_TYPES.SET_INVESTORS,
					data: InvestorsData,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.SET_INVESTORS,
				data: {
					count: 0,
					investors: [],
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* CreateInvestorSaga({ data }: ICreateInvestorAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(createInvestor, errorHandlers, data)

		yield put(push(MAIN_ROUTES.INVESTORS))
		toast.success('Succesfully created the investor')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.GET_INVESTORS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

function* EditInvestorSaga({ data }: IEditInvestorAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(editInvestor, errorHandlers, data)

		yield put(push(`/investors/detail/${data.investorId}`))
		toast.success('Succesfully edited the investor')
	} catch (e) {
		yield put(
			GenericActionCreator<IGetInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.GET_INVESTORS,
				data: {
					page: 1,
					size: 10,
				},
			}),
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* GetSingleInvestorSaga({ data }: IGetSingleInvestorsAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const investor: IInvestor = yield serviceWrapperSaga(getInvestor, errorHandlers, data)
		yield put(
			GenericActionCreator<ISetSingleInvestorAction>({
				type: INVESTORS_ACTION_TYPES.SET_INVESTOR,
				data: investor,
			}),
		)
	} catch (e) {
		yield put(
			GenericActionCreator<ISetSingleInvestorAction>({
				type: INVESTORS_ACTION_TYPES.SET_INVESTOR,
				data: null,
			}),
		)
		yield put(push(MAIN_ROUTES.INVESTORS))
		toast.error('There was an error with the investor data')
	}
}

function* DeleteInvestorSaga({ data }: IDeleteInvestorAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(deleteInvestor, errorHandlers, data)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const filter = yield select((state: IGlobalState) => state.investors.filter)
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const investors = yield select((state: IGlobalState) => state.investors)
		const investorsNumber = investors.investors.length - 1
		yield put(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'investors',
					pageNumber: investors.page === 1 ? 1 : investorsNumber > 0 ? investors.page : investors.page - 1,
				},
			}),
		)
		yield put(
			GenericActionCreator<IGetInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.GET_INVESTORS,
				data: { ...filter, page: investors.page === 1 ? 1 : investorsNumber > 0 ? investors.page : investors.page - 1 },
			}),
		)
		yield put(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))

		toast.success('Succesfully deleted the investor')
	} catch (e) {
		yield put(
			GenericActionCreator<IInvestorsToggleLoadingAction>({
				type: INVESTORS_ACTION_TYPES.INVESTORS_TOGGLE_LODING,
			}),
		)
		console.log(e)
	}
}

function* GetLocationsSaga() {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const Data: ILocation[] = yield serviceWrapperSaga(getLocations, errorHandlers)

		if (Data) {
			yield put(
				GenericActionCreator<ISetInvestorLocationsAction>({
					type: INVESTORS_ACTION_TYPES.SET_LOCATIONS,
					data: Data,
				}),
			)
		}
	} catch (e) {
		yield put(
			GenericActionCreator<ISetInvestorLocationsAction>({
				type: INVESTORS_ACTION_TYPES.SET_LOCATIONS,
				data: [],
			}),
		)
	}
}

function* PutInvestorContactsSaga({ data }: IPutInvestorContacstAction) {
	try {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		yield serviceWrapperSaga(putInvestorContacts, errorHandlers, data)
		yield put(toggleModalVisibility(MODAL_NAMES.CONTACT))

		yield put(
			GenericActionCreator<IGetSingleInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.GET_INVESTOR,
				data: data.investorId,
			}),
		)
	} catch (e) {
		console.log(e)
	}
}

function* DeleteInvestorContactSaga({ data }: IDeleteInvestorContactAction) {
	try {
		// eslint-disable-next-line no-debugger
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const contacts = yield select((state: IGlobalState) => state.investors.contacts)

		if (data.investorId) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			yield serviceWrapperSaga(deleteInvestorContact, errorHandlers, data)
			yield put(
				GenericActionCreator<IGetSingleInvestorsAction>({
					type: INVESTORS_ACTION_TYPES.GET_INVESTOR,
					data: data.investorId,
				}),
			)
		} else {
			const newContacts = contacts.filter((contact: Partial<IContact>) => contact.tempId !== data.contactId)
			yield put(
				GenericActionCreator<ISetContactsAction>({
					type: INVESTORS_ACTION_TYPES.SET_CONTACTS,
					data: newContacts,
				}),
			)
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 * InvestorModuleSaga Init
 *
 * @returns {IterableIterator<ForkEffect[]>}
 */
export default function* InvestorModuleSaga(): Generator {
	yield takeLatest(INVESTORS_ACTION_TYPES.GET_INVESTORS, GetInvestorsSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.CREATE_INVESTOR, CreateInvestorSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.EDIT_INVESTOR, EditInvestorSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.GET_INVESTOR, GetSingleInvestorSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.DELETE_INVESTOR, DeleteInvestorSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.GET_LOCATIONS, GetLocationsSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.PUT_INVESTOR_CONTACTS, PutInvestorContactsSaga)
	yield takeLatest(INVESTORS_ACTION_TYPES.DELETE_INVESTOR_CONTACT, DeleteInvestorContactSaga)
}
