import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { IGlobalState } from '@src/redux/reducers'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../action/generic.action'
import { IStateName } from '../types'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from './pagination.actions'

interface IPaginationProps {
	stateName: IStateName
	count: number
}

const pageLimit = 10

const createArrayFromNum = (num: number, start = 1) => {
	const res: number[] = []
	if (num === 0) return res
	for (let i = start; i <= num; i += 1) {
		res.push(i)
	}

	return res
}

export const Pagination = ({ stateName, count }: IPaginationProps) => {
	const dispatch = useDispatch()
	const { currentPage } = useSelector((state: IGlobalState) => state.pagination[stateName])
	const pageNumber = useMemo(() => Math.ceil((count || 1) / pageLimit), [count])
	const initialShow = count === 0 ? 0 : (currentPage - 1) * pageLimit + 1
	const endShow = currentPage * pageLimit > count ? count : currentPage * pageLimit

	const [firstPages, setFirstPages] = useState(createArrayFromNum(pageNumber > 3 ? 3 : pageNumber))
	const [lastPages, setLastPages] = useState(
		createArrayFromNum(pageNumber > 3 ? pageNumber : 0, pageNumber <= 6 ? 4 : pageNumber - 2),
	)

	useEffect(() => {
		setFirstPages(createArrayFromNum(pageNumber > 3 ? 3 : pageNumber))
		setLastPages(createArrayFromNum(pageNumber > 3 ? pageNumber : 0, pageNumber <= 6 ? 4 : pageNumber - 2))
	}, [pageNumber])

	const isNextDisabled = count <= pageLimit || pageNumber === currentPage
	const isPreviousDisabled = currentPage === 1
	const activeClassName =
		'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
	const nonActiveClassName =
		'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium cursor-pointer'

	const handleNext = () => {
		if (!isNextDisabled) {
			const setPage = currentPage + 1
			dispatch(
				GenericActionCreator<ISetPageAction>({
					type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
					data: {
						stateName,
						pageNumber: setPage,
					},
				}),
			)

			const pagesIncluedsSetPage = lastPages.includes(setPage) || firstPages.includes(setPage)

			if (!pagesIncluedsSetPage) {
				setFirstPages((s) => [...s.slice(1), s[s.length - 1] + 1])
			}
		}
	}

	const handlePrevious = () => {
		if (!isPreviousDisabled) {
			const setPage = currentPage - 1
			dispatch(
				GenericActionCreator<ISetPageAction>({
					type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
					data: {
						stateName,
						pageNumber: setPage,
					},
				}),
			)

			const pagesIncluedsSetPage = firstPages.includes(setPage) || lastPages.includes(setPage)

			if (!pagesIncluedsSetPage) {
				setFirstPages((s) => [s[0] - 1, ...s.slice(0, s.length - 1)])
			}
		}
	}

	const handlePageClick = (pageNum: number) => {
		dispatch(
			GenericActionCreator<ISetPageAction>({
				type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
				data: {
					stateName,
					pageNumber: pageNum,
				},
			}),
		)
	}

	return (
		<div className='px-4 py-5 flex items-center justify-between sm:px-6'>
			<div className='flex-1 flex justify-between sm:hidden'>
				<span
					onClick={handlePrevious}
					className={`relative ${
						isPreviousDisabled ? 'cursor-not-allowed' : ''
					} inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
				>
					Previous
				</span>
				<span
					onClick={handleNext}
					className={`ml-3 relative ${
						isNextDisabled ? 'cursor-not-allowed' : ''
					} inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
				>
					Next
				</span>
			</div>
			<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm text-gray-700'>
						Showing <span className='font-medium'>{initialShow}</span>{' '}
						{endShow > 0 && (
							<>
								to <span className='font-medium'>{endShow} </span>
							</>
						)}
						of <span className='font-medium'>{count}</span> results
					</p>
				</div>
				<div>
					<nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
						<div
							onClick={handlePrevious}
							className={`relative ${
								isPreviousDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
							} inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
						>
							<span className='sr-only'>Previous</span>
							<ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
						</div>

						{firstPages.map((page) => (
							<span
								onClick={() => handlePageClick(page)}
								key={page}
								className={currentPage === page ? activeClassName : nonActiveClassName}
							>
								{page}
							</span>
						))}

						{lastPages.length > 0 && pageNumber > 6 && lastPages[0] !== firstPages[2] + 1 && (
							<span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
								...
							</span>
						)}

						{lastPages.map((page) => (
							<span
								onClick={() => handlePageClick(page)}
								key={page}
								className={currentPage === page ? activeClassName : nonActiveClassName}
							>
								{page}
							</span>
						))}

						<div
							onClick={handleNext}
							className={`relative ${
								isNextDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
							} inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
						>
							<span className='sr-only'>Next</span>
							<ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}
