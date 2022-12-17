/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { MouseEventHandler, ReactNode, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '../pagination'
import { IColumn, IStateName, ITableRow } from '../types'

const createDetailUrl = (row: ITableRow) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (row.capZoneId) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return `/capzoneIds/detail/${row.capZoneId}`
	} else if ('assetId' in row) {
		return `/qozbs/${row.businessId}/assets/detail/${row.assetId}`
	} else if ('businessName' in row) {
		return `/qozbs/detail/${row.businessId}`
	} else if ('fundName' in row) {
		return `/funds/detail/${row.fundId}`
	} else if ('investorId' in row) {
		return `/investors/detail/${row.investorId}`
	} else {
		return null
	}
}

interface ITableProps<T = ITableRow> {
	columns: IColumn<T>[]
	data: T[]
	count: number
	stateName: IStateName
	dataKey: keyof T
	tableActions?: (row: T) => ReactNode
	assetType?: string
}

export function Table<T>({ columns, data, stateName, tableActions, dataKey, count, assetType }: ITableProps<T>) {
	const navigate = useNavigate()
	const emptyState = useMemo(() => {
		return (
			<td colSpan={columns.length} className={'md:p-20 p-12'}>
				<div className='flex flex-col items-center justify-center'>
					<DatabaseIcon className='w-20 h-20 text-gray-700' />
					<span className='mt-2 block text-sm font-medium text-gray-900'>No Data Found</span>
				</div>
			</td>
		)
	}, [])

	const handleRowClick =
		(row: T): MouseEventHandler<HTMLTableRowElement> =>
		(e) => {
			e.stopPropagation()
			const url = createDetailUrl(row as never)
			if (url) {
				navigate(url)
			}
		}

	return (
		<div className='mt-5 flex flex-col'>
			<div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 md:px-6 lg:px-8'>
					<div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-300 bg-white'>
							<thead className='bg-gray-50'>
								<tr>
									{columns.map((column, ind) => (
										<th
											key={ind}
											scope='col'
											className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
										>
											<div className='group inline-flex'>
												{column.title}
												<span className='invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'>
													<ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											</div>
										</th>
									))}
									{!!tableActions && <th className='py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6'></th>}
								</tr>
							</thead>

							<tbody className='divide-y divide-gray-200 bg-white'>
								{data.map((obj: T) => (
									<tr onClick={handleRowClick(obj)} className='cursor-pointer' key={obj[dataKey] as never}>
										{columns.map((column, ind) => (
											<td key={ind} className='px-3 py-4 pl-6 text-sm text-gray-500'>
												{column.render ? column.render(obj) : column.dataKey ? obj[column.dataKey as never] : '-'}
											</td>
										))}
										{!!tableActions && <td className='px-3 py-4 pl-4 text-sm text-gray-500'>{tableActions(obj)}</td>}
									</tr>
								))}
								{data.length === 0 && emptyState}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{!assetType && <Pagination count={count} stateName={stateName} />}
		</div>
	)
}
