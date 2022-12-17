/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { memo, NamedExoticComponent, useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { IGlobalState } from '../../redux/reducers'
import { useDebounce } from '../../hooks/use-debounce'
import { INVESTORS_ACTION_TYPES, ISetInvestorFilterAction } from './investors.actions'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

export const InvestorsFilter: NamedExoticComponent<any> = memo(() => {
	const dispatch = useDispatch()

	const [searchText, setSearchText] = useState('')

	const { filter, locations } = useSelector((state: IGlobalState) => state.investors)

	const debouncedSearch = useDebounce(searchText, 300)

	useEffect(() => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'investors',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetInvestorFilterAction>({
				type: INVESTORS_ACTION_TYPES.SET_FILTER,
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
	const handleLocationChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'investors',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetInvestorFilterAction>({
				type: INVESTORS_ACTION_TYPES.SET_FILTER,
				data: {
					name: e.target.name,
					data: locations.find((loc) => loc.stateName === e.target.value),
				},
			}),
		)
	}

	return (
		<div className='flex-wrap flex-col sm:flex-row flex justify-between sm:items-center gap-2 mt-3 pt-5 border-t border-gray-200'>
			<div>
				<div className='mt-1 relative rounded-md shadow-sm'>
					<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
						<SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</div>
					<input
						type='text'
						name='search'
						className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
						placeholder='Search for an investor...'
						onChange={handleSearchedTextChange}
						value={searchText}
					/>
				</div>
			</div>

			<div className='flex gap-2 flex-col sm:flex-row'>
				<div className='flex-wrap flex-col flex sm:items-center sm:flex-row gap-2'>
					<label htmlFor='location' className='text-sm font-medium text-gray-700'>
						Locations:{' '}
					</label>
					<select
						name='location'
						className='text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
						onChange={handleLocationChange}
						value={filter.location?.stateName}
					>
						<option>All Locations</option>
						{locations.map((loc) => (
							<option key={loc.state} value={loc.stateName}>
								{loc.stateName}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	)
})
