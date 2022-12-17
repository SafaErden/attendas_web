/* eslint-disable react/display-name */
import { IColumn } from '../../shared/types'
import PageLayout from '../../shared/components/page-layout'
import { FundProps, IFund } from './funds'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IGlobalState } from '../../redux/reducers'
import { IFundsState } from './funds.reducer'
import { IPagination } from '../../shared/pagination/pagination.reducer'
import { memo, NamedExoticComponent, useEffect } from 'react'
import {
	FUNDS_ACTION_TYPES,
	IActivateFundAction,
	IDeactivateFundAction,
	IGetEntityTypesAction,
	IGetFundsAction,
	IGetFundTypesAction,
	IGetLocationsAction,
} from './funds.actions'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { TableActions } from '../../shared/components/table-actions'
import { Spin } from 'antd'
import { Table } from '../../shared/components/table'
import { FundsFilter } from './funds.filter'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { TableButtons } from '../../shared/components/table-action-buttons'
import { PencilIcon, DocumentSearchIcon, TrashIcon } from '@heroicons/react/solid'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../Users/users.actions'

const columns = (): IColumn<IFund>[] => [
	{
		title: 'FUND',
		render: (row: IFund) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row.fundName}</span>
				<span className='text-gray-500'>{row.fundType?.fundTypeName ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'LOCATION',
		render: (row: IFund) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row.city}</span>
				<span className='text-gray-500'>{row.state ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'RELATED CAPZONE IDS',
		dataKey: 'capzoneIdCount',
	},
	{
		title: 'CERTIFICATION DATE',
		render: (row: IFund) => dayjs(row.certificationDate).format('MM/DD/YYYY'),
	},
	{
		title: 'ENTITY TYPE',
		render: (row: IFund) => row.entityType?.entityTypeName,
	},
]

const Funds: NamedExoticComponent<FundProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, funds, filter, loading } = useSelector<IGlobalState, IFundsState>((state) => state.funds)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.funds)

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetFundsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS,
				data: { ...filter, page: currentPage, size: 10 },
			}),
		)
	}, [filter.search, filter.type, filter.location, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetLocationsAction>({
				type: FUNDS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetFundTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_FUND_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetEntityTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_ENTITY_TYPES,
			}),
		)
	}, [])

	const onActivateOrDeactivateClick = (fundId: string, isActive: boolean) => {
		if (isActive) {
			dispatch(
				GenericActionCreator<IDeactivateFundAction>({
					type: FUNDS_ACTION_TYPES.DEACTIVATE_FUND,
					data: fundId,
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IActivateFundAction>({
					type: FUNDS_ACTION_TYPES.ACTIVATE_FUND,
					data: fundId,
				}),
			)
		}
	}

	const handleDelete = (row: IFund) => {
		dispatch(
			GenericActionCreator<ISetDeleteData>({
				type: USERS_ACTION_TYPES.SET_DELETE_DATA,
				data: {
					deleteId: row.fundId,
					stateName: 'funds',
					itemName: row.fundName,
				},
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))
	}

	const actions = (row: IFund) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					kind='edit'
					onClick={() => navigate(`/funds/create-edit/${row.fundId}`)}
				>
					Edit
				</TableButtons>
				<TableButtons
					Icon={<DocumentSearchIcon className='w-4 h-4' />}
					kind='details'
					onClick={() => navigate(`/funds/detail/${row.fundId}`)}
				>
					Details
				</TableButtons>
				<TableButtons
					Icon={row.active ? <PauseIcon className='w-4 h-4' /> : <PlayIcon className='w-4 h-4' />}
					kind={row.active ? 'deactivate' : 'activate'}
					onClick={() => onActivateOrDeactivateClick(row.fundId, row.active)}
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
				onButtonClick={() => navigate('/funds/create-edit')}
				Icon={<span>+</span>}
				buttonTitle='Create a Fund'
				name='Funds'
			>
				<div className='flex flex-col relative'>
					<FundsFilter />
					<Table
						dataKey='fundId'
						tableActions={actions}
						stateName='funds'
						data={funds}
						count={count}
						columns={columns()}
					/>
				</div>
			</PageLayout>
		</Spin>
	)
})

export { Funds as default }
