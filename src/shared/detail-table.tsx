/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { memo, NamedExoticComponent, useEffect } from 'react'

import { IBussinesType, IQOZB } from '../pages/QOZBS/qozbs'
import { IInvestor } from '../pages/Investors/investors'
import { IFund } from '../pages/Funds/funds'
import { IColumn } from './types'
import { ICapzoneId } from '../pages/CapzoneIds/capzoneIds'
import { IGlobalState } from '../redux/reducers'
import { ICapzoneIdsState } from '../pages/CapzoneIds/capzoneIds.reducer'
import { IQozbsState } from '../pages/QOZBS/qozb.reducer'
import { IPagination } from './pagination/pagination.reducer'
import {
	CAPZONEIDS_ACTION_TYPES,
	IGetAllUsersAction,
	IGetCapzoneIdsWithIdAction,
	IResetCapzoneIdFilterAction,
} from '../pages/CapzoneIds/capzoneIds.actions'
import { GenericActionCreator } from './action/generic.action'
import { IGetQozbTypesAction, QOZBS_ACTION_TYPES } from '../pages/QOZBS/qozbs.actions'
import { Spin } from 'antd'
import { Table } from './components/table'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from './pagination/pagination.actions'
import { Button } from './components/button'

interface IDetailTableProps {
	data: (IFund & IQOZB & IInvestor) | any
}
const columns = (qozbTypes: IBussinesType[]): IColumn<ICapzoneId>[] => [
	{
		title: 'FUND',
		render: (row: ICapzoneId) => (
			<div className='flex items-center gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row?.fund?.fundName}</span>
				<span className='text-gray-500'>{row?.fund?.fundType?.fundTypeName ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'INVESTOR',
		render: (row: ICapzoneId) => (
			<div className='flex items-center gap-1 justify-center flex-col'>
				<span className='text-gray-900'>
					{row?.investor?.firstName} {row?.investor?.lastName}
				</span>
				<span className='text-gray-500'>{row?.investor?.email ?? '-'}</span>
			</div>
		),
	},
	{
		title: 'QOZB',
		render: (row: ICapzoneId) => (
			<div className='flex items-center gap-1 justify-center flex-col'>
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
		title: 'DATE OF INVESTMENT',
		render: (row: ICapzoneId) => dayjs(row.investor.createdDate).format('MM/DD/YYYY') ?? '-',
	},
]

const DetailTable: NamedExoticComponent<IDetailTableProps> = memo(({ data }: IDetailTableProps) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, capZoneIDs, filter, loading } = useSelector<IGlobalState, ICapzoneIdsState>(
		(state) => state.capzoneIds,
	)

	const { qozbTypes } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.capzoneIds)

	useEffect(() => {
		if (data) {
			dispatch(
				GenericActionCreator<IGetCapzoneIdsWithIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.GET_CZIDS_WITH_ID,
					data: {
						...filter,
						fundId: data?.fundId || undefined,
						qozbId: data?.businessId || undefined,
						investorId: data?.investorId || undefined,
						page: currentPage,
						size: 10,
						type: data?.fundId ? 'fund' : data?.businessId ? 'qozb' : 'investor',
					},
				}),
			)
		}
	}, [data?.fundId, data?.businessId, data?.investorId, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllUsersAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_USERS,
			}),
		)

		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'capzoneIds',
					pageNumber: 1,
				},
			}),
		)

		return () => {
			dispatch(
				GenericActionCreator<IResetCapzoneIdFilterAction>({
					type: CAPZONEIDS_ACTION_TYPES.RESET_FILTER,
				}),
			)
		}
	}, [])

	return (
		<Spin spinning={loading}>
			<div style={{ marginBottom: '-16px' }} className='flex justify-end mt-6'>
				<Button kind='transparent' onClick={() => navigate('/capzoneIds')}>
					Show all CapZone IDs
				</Button>
			</div>

			<div className='flex flex-col relative'>
				<Table
					dataKey='capZoneId'
					stateName='capzoneIds'
					data={capZoneIDs}
					count={count}
					columns={columns(qozbTypes)}
				/>
			</div>
		</Spin>
	)
})

export { DetailTable as default }
