/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { Table } from '../../shared/components/table'
import PageLayout from '../../shared/components/page-layout'
import { IBussinesType, IQOZB, QozbProps } from './qozbs'
import { memo, NamedExoticComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import {
	IActivateQozbAction,
	IDeactivateQozbAction,
	IGetPropertyOwnersAction,
	IGetQozbEntityTypesAction,
	IGetQozbLocationsAction,
	IGetQozbsAction,
	IGetQozbTypesAction,
	QOZBS_ACTION_TYPES,
} from './qozbs.actions'
import { IGlobalState } from '../../redux/reducers'
import { IQozbsState } from './qozb.reducer'
import { IColumn } from '../../shared/types'
import { QozbsFilter } from './qozbs.filter'
import { IPagination } from '../..//shared/pagination/pagination.reducer'
import { useNavigate } from 'react-router-dom'
import { TableActions } from '../../shared/components/table-actions'
import { Spin } from 'antd'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { TableButtons } from '../../shared/components/table-action-buttons'
import { PencilIcon, DocumentSearchIcon, TrashIcon } from '@heroicons/react/solid'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../Users/users.actions'

const columns = (businessTypes: IBussinesType[]): IColumn<IQOZB>[] => {
	return [
		{
			title: 'QOZB',
			render: (row: IQOZB) => (
				<div className='flex gap-1 justify-center flex-col'>
					<span className='text-gray-900'>{row.businessName}</span>
					<span className='text-gray-500'>{row.businessTypeId}</span>
				</div>
			),
		},
		{
			title: 'LOCATION',
			render: (row: IQOZB) => (
				<div className='flex gap-1 justify-start flex-col'>
					<span className='text-gray-900'>{row.street}</span>
					<span className='text-gray-500'>
						{row.state} {row.country ?? ''}
					</span>
				</div>
			),
		},
		{
			title: 'QOZB Type',
			render: (row: IQOZB) => (
				<div className='flex gap-1 justify-center flex-col'>
					<span className='text-gray-500'>
						{businessTypes?.find((t) => t.businessTypeId === row?.businessTypeId)?.businessTypeName ?? '-'}
					</span>
				</div>
			),
		},
		{
			title: 'TOTAL MONEY INVESTED',
			dataKey: 'totalMoney',
		},
	]
}
const Qozbs: NamedExoticComponent<QozbProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, qozbs, filter, loading, qozbTypes } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.qozbs)

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQozbsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS,
				data: { ...filter, page: currentPage, size: 10 },
			}),
		)
	}, [filter.search, filter.location, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQozbLocationsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES,
			}),
		)

		/**
		 * @Emre TODO we don need to fetch these here
		 */
		dispatch(
			GenericActionCreator<IGetQozbEntityTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ENTITY_TYPES,
			}),
		)

		dispatch(
			GenericActionCreator<IGetPropertyOwnersAction>({
				type: QOZBS_ACTION_TYPES.GET_PROPERTY_OWNERS,
			}),
		)
	}, [])

	const onActivateOrDeactivateClick = (businessId: string | number, isActive: boolean) => {
		if (isActive) {
			dispatch(
				GenericActionCreator<IDeactivateQozbAction>({
					type: QOZBS_ACTION_TYPES.DEACTIVATE_QOZB,
					data: businessId,
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IActivateQozbAction>({
					type: QOZBS_ACTION_TYPES.ACTIVATE_QOZB,
					data: businessId,
				}),
			)
		}
	}

	const handleDelete = (row: IQOZB) => {
		dispatch(
			GenericActionCreator<ISetDeleteData>({
				type: USERS_ACTION_TYPES.SET_DELETE_DATA,
				data: {
					deleteId: row.businessId as string,
					stateName: 'qozbs',
					itemName: row.businessName,
				},
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))
	}

	const actions = (row: IQOZB) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					kind='edit'
					onClick={() => navigate(`/qozbs/create-edit/${row.businessId}`)}
				>
					Edit
				</TableButtons>
				<TableButtons
					Icon={<DocumentSearchIcon className='w-4 h-4' />}
					kind='details'
					onClick={() => navigate(`/qozbs/detail/${row.businessId}`)}
				>
					Details
				</TableButtons>
				<TableButtons
					Icon={row.active ? <PauseIcon className='w-4 h-4' /> : <PlayIcon className='w-4 h-4' />}
					kind={row.active ? 'deactivate' : 'activate'}
					onClick={() => onActivateOrDeactivateClick(row.businessId, row.active as boolean)}
				>
					{row.active ? 'Deactivate' : 'Activate'}
				</TableButtons>
				<TableButtons Icon={<TrashIcon className='w-4 h-4' />} kind='delete' onClick={() => handleDelete(row)}>
					Delete
				</TableButtons>
			</TableActions>
		)
	}

	return (
		<Spin spinning={loading}>
			<PageLayout
				onButtonClick={() => navigate('/qozbs/create-edit')}
				Icon={<span>+</span>}
				buttonTitle='Create a QOZB'
				name='QOZBs'
			>
				<div className='flex flex-col relative'>
					<QozbsFilter />
					<Table
						dataKey='businessId'
						tableActions={actions}
						stateName='qozbs'
						data={qozbs}
						count={count}
						columns={columns(qozbTypes)}
					/>
				</div>
			</PageLayout>
		</Spin>
	)
})

export { Qozbs as default }
