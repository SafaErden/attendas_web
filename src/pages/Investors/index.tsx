/* eslint-disable react/display-name */
import { IColumn } from '../../shared/types'
import PageLayout from '../../shared/components/page-layout'
import { IInvestor, InvestorProps } from './investors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IGlobalState } from '../../redux/reducers'
import { IInvestorsState } from './investors.reducer'
import { IPagination } from '../../shared/pagination/pagination.reducer'
import { memo, NamedExoticComponent, useEffect } from 'react'
import { INVESTORS_ACTION_TYPES, IGetInvestorsAction, IGetInvestorLocationsAction } from './investors.actions'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { TableActions } from '../../shared/components/table-actions'
import { Spin } from 'antd'
import { Table } from '../../shared/components/table'
import { InvestorsFilter } from './investors.filter'
import { toggleModalVisibility } from '../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { TableButtons } from '../../shared/components/table-action-buttons'
import { PencilIcon, DocumentSearchIcon, TrashIcon } from '@heroicons/react/solid'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../Users/users.actions'
const columns = (): IColumn<IInvestor>[] => [
	{
		title: 'INVESTOR',
		render: (row: IInvestor) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row.company ? row.companyName : `${row.firstName} ${row.lastName}`}</span>
				<span className='text-gray-500'>{row.email}</span>
			</div>
		),
	},
	{
		title: 'LOCATION',
		render: (row: IInvestor) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row.street}</span>
				<span className='text-gray-500'>
					{!!row.state && `${row.state},`} {row.country ?? '-'}
				</span>
			</div>
		),
	},
	{
		title: 'NUMBER OF ACTIVE FUNDS',
		dataKey: 'activeFundsCount',
	},
	{
		title: 'TOTAL ACTIVE INVESTMENT',
		dataKey: 'totalActiveInvestment',
	},
]

const Investors: NamedExoticComponent<InvestorProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, investors, filter, loading } = useSelector<IGlobalState, IInvestorsState>((state) => state.investors)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.investors)

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetInvestorsAction>({
				type: INVESTORS_ACTION_TYPES.GET_INVESTORS,
				data: { ...filter, page: currentPage, size: 10 },
			}),
		)
	}, [filter.search, filter.location, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetInvestorLocationsAction>({
				type: INVESTORS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)
	}, [])

	const handleDelete = (row: IInvestor) => {
		dispatch(
			GenericActionCreator<ISetDeleteData>({
				type: USERS_ACTION_TYPES.SET_DELETE_DATA,
				data: {
					deleteId: row.investorId,
					stateName: 'investors',
					itemName: row.firstName + ' ' + row.lastName,
				},
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))
	}

	const actions = (row: IInvestor) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					kind='edit'
					onClick={() => navigate(`/investors/create-edit/${row.investorId}`)}
				>
					Edit
				</TableButtons>
				<TableButtons
					Icon={<DocumentSearchIcon className='w-4 h-4' />}
					kind='details'
					onClick={() => navigate(`/investors/detail/${row.investorId}`)}
				>
					Details
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
				onButtonClick={() => navigate('/investors/create-edit')}
				Icon={<span>+</span>}
				buttonTitle='Create an Investor'
				name='Investors'
			>
				<div className='flex flex-col relative'>
					<InvestorsFilter />
					<Table
						dataKey='investorId'
						tableActions={actions}
						stateName='investors'
						data={investors}
						count={count}
						columns={columns()}
					/>
				</div>
			</PageLayout>
		</Spin>
	)
})

export { Investors as default }
