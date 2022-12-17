/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { Table } from '../../shared/components/table'
import PageLayout from '../../shared/components/page-layout'
import { IUser, UserProps } from './users'
import { memo, NamedExoticComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { IGetUsersAction, USERS_ACTION_TYPES } from './users.actions'
import { IGlobalState } from '../../redux/reducers'
import { IUsersState } from './users.reducer'
import { Badge } from '../../shared/components/badge'
import { IColumn } from '../../shared/types'
import { UsersFilter } from './users.filter'
import { IPagination } from '../..//shared/pagination/pagination.reducer'
import { useNavigate } from 'react-router-dom'
import { TableActions } from '../../shared/components/table-actions'
import { Spin } from 'antd'
import { TableButtons } from '../../shared/components/table-action-buttons'
import { PencilIcon } from '@heroicons/react/solid'

const columns: IColumn<IUser>[] = [
	{
		title: 'USER',
		render: (row: IUser) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>
					{row.firstName} {row.lastName}
				</span>
				<span className='text-gray-500'>{row.email}</span>
			</div>
		),
	},
	{
		title: 'PHONE NUMBER',
		dataKey: 'phone',
	},
	{
		title: 'ROLE',
		render: (row: IUser) => <Badge type={row.roleId} title={row.roleName} />,
	},
	{
		title: 'ASSIGNED FUNDS',
		dataKey: 'AFunds',
	},
	{
		title: 'GENERATED FUNDS',
		dataKey: 'GFunds',
	},
	{
		title: 'OPEN TASKS',
		dataKey: 'OTasks',
	},
]

const Users: NamedExoticComponent<UserProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { count, users, filter, loading } = useSelector<IGlobalState, IUsersState>((state) => state.users)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.users)

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetUsersAction>({
				type: USERS_ACTION_TYPES.GET_USERS,
				data: { ...filter, page: currentPage, size: 10 },
			}),
		)
	}, [filter.search, filter.role, currentPage])

	const actions = (row: IUser) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					kind='edit'
					onClick={() => navigate(`/users/create-edit/${row.userId}`)}
				>
					Edit
				</TableButtons>
			</TableActions>
		)
	}

	return (
		<Spin spinning={loading}>
			<PageLayout
				onButtonClick={() => navigate('/users/create-edit')}
				Icon={<span>+</span>}
				buttonTitle='Create a User'
				name='Users'
			>
				<div className='flex flex-col relative'>
					<UsersFilter />
					<Table
						dataKey='userId'
						tableActions={actions}
						stateName='users'
						data={users}
						count={count}
						columns={columns}
					/>
				</div>
			</PageLayout>
		</Spin>
	)
})

export { Users as default }
