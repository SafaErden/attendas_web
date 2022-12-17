/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'
import { memo, NamedExoticComponent, useEffect, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { useDebounce } from '../../hooks/use-debounce'
import { CAPZONEIDS_ACTION_TYPES, ISetCapzoneIdFilterAction } from './capzoneIds.actions'
import { SelectSearchable } from '../../shared/components/selectSearchable'
import { IGlobalState } from '../../redux/reducers'
import { IOption } from '../../shared/types'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../shared/pagination/pagination.actions'

export const CapzoneIdsFilter: NamedExoticComponent<any> = memo(() => {
	const dispatch = useDispatch()

	const { filter, allFunds, allInvestors, allQozbs } = useSelector((state: IGlobalState) => state.capzoneIds)

	const [searchText, setSearchText] = useState('')

	const debouncedSearch = useDebounce(searchText, 300)

	useEffect(() => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'capzoneIds',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetCapzoneIdFilterAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_FILTER,
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

	const handleChange = (name: string) => (value: IOption) => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName: 'capzoneIds',
					pageNumber: 1,
				},
			}),
		)
		dispatch(
			GenericActionCreator<ISetCapzoneIdFilterAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_FILTER,
				data: {
					name: name,
					data: value.name || undefined,
				},
			}),
		)
	}

	const fundOptions = [
		{ id: 0, name: 'All Funds' },
		...allFunds.map((f) => ({
			id: f.fundId,
			name: f.fundName,
		})),
	]

	const investorOptions = [
		{ id: 0, name: 'All Investors' },
		...allInvestors.map((i) => ({
			id: i.investorId,
			name: i.company ? `${i.companyName}` : `${i.firstName} ${i.lastName}`,
		})),
	]

	const qozbOptions = [
		{ id: 0, name: 'All QOZBs' },
		...allQozbs.map((q) => ({
			id: q.businessId as string,
			name: q.businessName,
		})),
	]

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
						placeholder='Search for a capzoneId...'
						onChange={handleSearchedTextChange}
						value={searchText}
					/>
				</div>
			</div>

			<SelectSearchable
				label='Investor'
				options={investorOptions}
				value={filter.investor}
				placeholder='Search investor...'
				onChange={handleChange('investor')}
				useName
			/>
			<SelectSearchable
				label='Fund'
				options={fundOptions}
				value={filter.fund}
				placeholder='Search fund...'
				onChange={handleChange('fund')}
				useName
			/>
			<SelectSearchable
				label='QOZB'
				options={qozbOptions}
				value={filter.qozb}
				placeholder='Search QOZB...'
				onChange={handleChange('qozb')}
				useName
			/>
		</div>
	)
})
