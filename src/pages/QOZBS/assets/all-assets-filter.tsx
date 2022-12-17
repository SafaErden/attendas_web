/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { memo, NamedExoticComponent, useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { useDebounce } from '../../../hooks/use-debounce'
import { ISetAllAssetsFilterAction, QOZBS_ACTION_TYPES } from '../qozbs.actions'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../../shared/pagination/pagination.actions'

export const AllAssetsFilter: NamedExoticComponent<any> = memo(() => {
	const dispatch = useDispatch()

	const [searchText, setSearchText] = useState('')

	const debouncedSearch = useDebounce(searchText, 300)

	useEffect(() => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'assets',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetAllAssetsFilterAction>({
				type: QOZBS_ACTION_TYPES.SET_ALL_ASSETS_FILTER,
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
						placeholder='Search for an asset...'
						onChange={handleSearchedTextChange}
						value={searchText}
					/>
				</div>
			</div>
		</div>
	)
})
