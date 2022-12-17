import { ExclamationIcon } from '@heroicons/react/outline'
import { FUNDS_ACTION_TYPES, IDeleteFundAction } from '../../pages/Funds/funds.actions'
import { IDeleteInvestorAction, INVESTORS_ACTION_TYPES } from '../../pages/Investors/investors.actions'
import { IDeleteAssetAction, IDeleteQozbAction, QOZBS_ACTION_TYPES } from '../../pages/QOZBS/qozbs.actions'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../../pages/Users/users.actions'
import { IGlobalState } from '../../redux/reducers'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { GenericActionCreator } from '../action/generic.action'
import { MODAL_NAMES } from './modal/modal.contsants'
import { CAPZONEIDS_ACTION_TYPES, IDeleteCapzoneIdAction } from '../../pages/CapzoneIds/capzoneIds.actions'
import { Dialog } from '@headlessui/react'

const fieldName = {
	users: 'user',
	funds: 'fund',
	capzoneIds: 'capzoneId',
	qozbs: 'qozb',
	investors: 'investor',
	assets: 'asset',
}

const DeleteConfirmation = () => {
	const dispatch = useDispatch()
	const {
		deleteId,
		qozbId,
		stateName,
		itemName = 'CapZoneID',
	} = useSelector((state: IGlobalState) => state.users.deleteData)

	const handleDeleteClick = () => {
		if (stateName === 'funds') {
			dispatch(
				GenericActionCreator<IDeleteFundAction>({
					type: FUNDS_ACTION_TYPES.DELETE_FUND,
					data: deleteId,
				}),
			)
		} else if (stateName === 'capzoneIds') {
			dispatch(
				GenericActionCreator<IDeleteCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.DELETE_CAPZONEID,
					data: deleteId,
				}),
			)
		} else if (stateName === 'qozbs') {
			dispatch(
				GenericActionCreator<IDeleteQozbAction>({
					type: QOZBS_ACTION_TYPES.DELETE_QOZB,
					data: deleteId,
				}),
			)
		} else if (stateName === 'investors') {
			dispatch(
				GenericActionCreator<IDeleteInvestorAction>({
					type: INVESTORS_ACTION_TYPES.DELETE_INVESTOR,
					data: deleteId,
				}),
			)
		} else if (stateName === 'assets') {
			dispatch(
				GenericActionCreator<IDeleteAssetAction>({
					type: QOZBS_ACTION_TYPES.DELETE_ASSET,
					data: {
						qozbId: qozbId ?? '',
						assetId: deleteId,
					},
				}),
			)
		}
	}

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetDeleteData>({
					type: USERS_ACTION_TYPES.SET_DELETE_DATA,
					data: { deleteId: '', stateName: 'investors' },
				}),
			)
		}
	}, [])

	return (
		<>
			<div className='bg-white'>
				<div className='sm:flex sm:items-start'>
					<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
						<ExclamationIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
					</div>
					<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
						<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
							Delete &apos;{itemName}&apos;
						</Dialog.Title>
						<div className='mt-2'>
							<p className='text-sm text-gray-500'>
								Are you sure you want to delete this {fieldName[stateName]}? All of your data will be permanently
								removed. This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white px-4 pt-4 sm:flex sm:flex-row-reverse sm:px-6'>
				<button
					type='button'
					className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
					onClick={handleDeleteClick}
				>
					Delete
				</button>
				<button
					type='button'
					className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
					onClick={() => dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))}
				>
					Cancel
				</button>
			</div>
		</>
	)
}

export default DeleteConfirmation
