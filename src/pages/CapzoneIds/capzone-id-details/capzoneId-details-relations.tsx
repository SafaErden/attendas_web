/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICapzoneId } from '../capzoneIds'
import { useState } from 'react'
import { FlagIcon } from '@heroicons/react/outline'
import { SelectWithIcon } from '../../../shared/components/select-with-icon'
import { IOption } from '../../../shared/types'
import { Months, Picker } from '../../../shared/components/date-picker'
import { Dayjs } from 'dayjs'
import InvestorRelationshipView from '../investor-relationship/investor-relationship-view'
import { Button } from '../../../shared/components/button'
import { useNavigate, useParams } from 'react-router-dom'
import QozbRelationshipView from '../qozb-relationship/qozb-relationship-view'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { CAPZONEIDS_ACTION_TYPES, ISetCurrentTabAction, ISetIsRelationAction } from '../capzoneIds.actions'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export interface ICapzoneIdRelationsProps {
	capzoneId?: ICapzoneId
}
const tabs = [
	{ name: 'Investor Relationship', index: 1 },
	{ name: 'QOZB Relationship', index: 2 },
]

const flags = [
	{ id: 0, name: 'All Flags' },
	{ id: 1, name: 'Success' },
	{ id: 2, name: 'Warning' },
	{ id: 3, name: 'Error' },
]

export const CapzoneIdDetailsRelations = () => {
	const [flag, setFlag] = useState(0)
	const dispatch = useDispatch()
	const { capzoneId } = useParams()
	const navigate = useNavigate()

	const customFormat = (value: Dayjs) => `${Months[value.get('M')]}, ${value.format('YYYY')}`
	const { isRelation, currentTab } = useSelector((state: IGlobalState) => state.capzoneIds)

	const handleTabChange = (e: any) => {
		dispatch(
			GenericActionCreator<ISetCurrentTabAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CURRENT_TAB,
				data: e.target.value,
			}),
		)
	}

	const handleTabClick = (ind: number) => {
		dispatch(
			GenericActionCreator<ISetIsRelationAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_IS_RELATION,
				data: false,
			}),
		)
		dispatch(
			GenericActionCreator<ISetCurrentTabAction>({
				type: CAPZONEIDS_ACTION_TYPES.SET_CURRENT_TAB,
				data: ind,
			}),
		)
	}

	return (
		<div className='flex gap-2 flex-col'>
			<div className='ml-auto'>
				<Picker format={customFormat} picker='month' />
			</div>

			<div className='bg-white rounded-lg gap-2 shadow p-4 flex-col flex flex-1'>
				<div className='flex justify-between gap-3 wrap'>
					<div className='sm:hidden'>
						<label htmlFor='tabs' className='sr-only'>
							Select a tab
						</label>
						{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
						<select
							id='tabs'
							name='tabs'
							className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
							value={tabs.find((tab) => tab.index === currentTab)?.index}
							onChange={handleTabChange}
						>
							{tabs.map((tab) => (
								<option value={tab.index} key={tab.name}>
									{tab.name}
								</option>
							))}
						</select>
					</div>
					<div className='hidden sm:block'>
						<div className='border-b border-gray-200'>
							<nav className='-mb-px flex space-x-8' aria-label='Tabs'>
								{tabs.map((tab) => (
									<span
										key={tab.name}
										className={classNames(
											tab.index === currentTab
												? 'border-indigo-500 text-indigo-600'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
											'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
										)}
										aria-current={tab.index === currentTab ? 'page' : undefined}
										onClick={() => handleTabClick(tab.index)}
									>
										{tab.name}
									</span>
								))}
							</nav>
						</div>
					</div>

					<div className='flex gap-3 items-center'>
						<SelectWithIcon
							onChange={setFlag}
							options={flags}
							value={flag}
							Icon={(opt?: IOption<number>) => (
								<FlagIcon
									className={`w-3 h-3 ${
										opt?.id === 1
											? 'text-emerald-600'
											: opt?.id === 2
											? 'text-yellow-300'
											: opt?.id === 3
											? 'text-red-600'
											: ''
									}`}
								/>
							)}
						/>
						<Button
							onClick={() => {
								currentTab === 1
									? navigate(`/capzoneIds/detail/${capzoneId}/investor-relationship`)
									: navigate(`/capzoneIds/detail/${capzoneId}/qozb-relationship`)
							}}
							kind='transparent'
						>
							{isRelation ? 'Edit Relationship' : 'Create Relationship'}
						</Button>
					</div>
				</div>
				{currentTab === 1 ? <InvestorRelationshipView /> : <QozbRelationshipView />}
			</div>
		</div>
	)
}
