/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { memo, NamedExoticComponent, useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { ISetFilterAction, USERS_ACTION_TYPES } from './users.actions'
import { IGlobalState } from '../../redux/reducers'
import { useDebounce } from '../../hooks/use-debounce'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

export const UsersFilter: NamedExoticComponent<any> = memo(() => {
	const dispatch = useDispatch()

	const [searchText, setSearchText] = useState('')

	const { filter, roles } = useSelector((state: IGlobalState) => state.users)

	const debouncedSearch = useDebounce(searchText, 300)

	useEffect(() => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'users',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetFilterAction>({
				type: USERS_ACTION_TYPES.SET_FILTER,
				data: {
					name: 'search',
					data: debouncedSearch,
				},
			}),
		)
	}, [debouncedSearch])

	const handleSearchedTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearchText(e.target.value)
	}
	const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'users',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetFilterAction>({
				type: USERS_ACTION_TYPES.SET_FILTER,
				data: {
					name: e.target.name,
					data: e.target.name === 'role' ? roles.find((r) => r.roleName === e.target.value) : e.target.value,
				},
			}),
		)
	}

	return (
		<div className='flex-wrap flex flex-col sm:flex-row justify-between sm:items-center gap-2 mt-3 pt-5 border-t border-gray-200'>
			<div>
				<div className='mt-1 relative rounded-md shadow-sm'>
					<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
						<SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</div>
					<input
						type='text'
						name='search'
						className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
						placeholder='Search for a user...'
						onChange={handleSearchedTextChange}
						value={searchText}
					/>
				</div>
			</div>

			<div className='flex-wrap flex-col flex sm:items-center sm:flex-row gap-2'>
				<label htmlFor='location' className='text-sm font-medium text-gray-700'>
					Role:{' '}
				</label>
				<select
					name='role'
					className='w-60 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
					onChange={handleChange}
					value={filter.role?.roleName ?? 'Select a role...'}
				>
					<option>Select a role...</option>
					{roles.map((role) => (
						<option key={role.roleId} value={role.roleName}>
							{role.roleDescription}
						</option>
					))}
				</select>
			</div>
		</div>
	)
})
