/* eslint-disable react/display-name */
import { IColumn } from '../../shared/types'
import PageLayout from '../../shared/components/page-layout'
import { CapzoneIdProps, ICapzoneId } from './capzoneIds'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IGlobalState } from '../../redux/reducers'
import { ICapzoneIdsState } from './capzoneIds.reducer'
import { IPagination } from '../../shared/pagination/pagination.reducer'
import { memo, NamedExoticComponent, useEffect } from 'react'
import {
	CAPZONEIDS_ACTION_TYPES,
	IActivateCapzoneIdAction,
	IDeactivateCapzoneIdAction,
	IGetAllFundsAction,
	IGetAllInvestorsAction,
	IGetAllQozbsAction,
	IGetAllUsersAction,
	IGetCapzoneIdsAction,
} from './capzoneIds.actions'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { TableActions } from '../../shared/components/table-actions'
import { Spin } from 'antd'
import { Table } from '../../shared/components/table'
import { CapzoneIdsFilter } from './capzoneIds.filter'
import { IBussinesType } from '../QOZBS/qozbs'
import { IGetQozbTypesAction, QOZBS_ACTION_TYPES } from '../QOZBS/qozbs.actions'
import { IQozbsState } from '../QOZBS/qozb.reducer'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { TableButtons } from '../../shared/components/table-action-buttons'
import { PencilIcon, DocumentSearchIcon, TrashIcon } from '@heroicons/react/solid'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../Users/users.actions'
const columns = (qozbTypes: IBussinesType[]): IColumn<ICapzoneId>[] => [
	{
		title: 'INVESTOR',
		render: (row: ICapzoneId) => (
			<div className='flex gap-1 justify-center flex-col'>
				{row?.investor?.companyName ? (
					<span className='text-gray-900'>{row?.investor?.companyName}</span>
				) : (
					<span className='text-gray-900'>
						{row?.investor?.firstName} {row?.investor?.lastName}
					</span>
				)}
				<span className='text-gray-500'>{row?.investor?.email ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'FUND',
		render: (row: ICapzoneId) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row?.fund?.fundName}</span>
				<span className='text-gray-500'>{row?.fund?.fundType?.fundTypeName ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'QOZB',
		render: (row: ICapzoneId) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row?.business?.businessName}</span>
				<span className='text-gray-500'>
					{qozbTypes?.find((q) => q.businessTypeId === row?.business?.businessTypeId)?.businessTypeName}
				</span>
			</div>
		),
	},
	{
		title: 'COMPLIANCE SCORE',
		render: () => '-',
	},
	{
		title: 'LAST DATE OF INVESTMENT',
		render: (row: ICapzoneId) => dayjs(row.investor.createdDate).format('MM/DD/YYYY') ?? '-',
	},
]

const CapzoneIds: NamedExoticComponent<CapzoneIdProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, capZoneIDs, filter, loading } = useSelector<IGlobalState, ICapzoneIdsState>(
		(state) => state.capzoneIds,
	)

	const { qozbTypes } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.capzoneIds)

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetCapzoneIdsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEIDS,
				data: {
					...filter,
					fund: filter.fund?.includes('All') ? undefined : filter.fund,
					qozb: filter.qozb?.includes('All') ? undefined : filter.qozb,
					investor: filter.investor?.includes('All') ? undefined : filter.investor,
					page: currentPage,
					size: 10,
				},
			}),
		)
	}, [filter.search, filter.investor, filter.qozb, filter.fund, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllQozbsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_QOZBS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllFundsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_FUNDS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllInvestorsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_INVESTORS,
			}),
		),
			dispatch(
				GenericActionCreator<IGetAllUsersAction>({
					type: CAPZONEIDS_ACTION_TYPES.GET_ALL_USERS,
				}),
			)
	}, [])

	const onActivateOrDeactivateClick = (capzoneIdId: string, isActive: boolean) => {
		if (isActive) {
			dispatch(
				GenericActionCreator<IDeactivateCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.DEACTIVATE_CAPZONEID,
					data: capzoneIdId,
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IActivateCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.ACTIVATE_CAPZONEID,
					data: capzoneIdId,
				}),
			)
		}
	}

	const handleDelete = (row: ICapzoneId) => {
		dispatch(
			GenericActionCreator<ISetDeleteData>({
				type: USERS_ACTION_TYPES.SET_DELETE_DATA,
				data: {
					deleteId: row.capZoneId,
					stateName: 'capzoneIds',
				},
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))
	}

	const actions = (row: ICapzoneId) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					kind='edit'
					onClick={() => navigate(`/capzoneIds/create-edit/${row.capZoneId}`)}
				>
					Edit
				</TableButtons>
				<TableButtons
					Icon={<DocumentSearchIcon className='w-4 h-4' />}
					kind='details'
					onClick={() => navigate(`/capzoneIds/detail/${row.capZoneId}`)}
				>
					Details
				</TableButtons>
				<TableButtons
					Icon={row.active ? <PauseIcon className='w-4 h-4' /> : <PlayIcon className='w-4 h-4' />}
					kind={row.active ? 'deactivate' : 'activate'}
					onClick={() => onActivateOrDeactivateClick(row.capZoneId, row.active)}
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
				onButtonClick={() => navigate('/capzoneIds/create-edit')}
				Icon={<span>+</span>}
				buttonTitle='Create a CapZone ID'
				name='CapZone IDs'
			>
				<div className='flex flex-col relative'>
					<CapzoneIdsFilter />
					<Table
						dataKey='capZoneId'
						tableActions={actions}
						stateName='capzoneIds'
						data={capZoneIDs}
						count={count}
						columns={columns(qozbTypes)}
					/>
				</div>
			</PageLayout>
		</Spin>
	)
})

export { CapzoneIds as default }
