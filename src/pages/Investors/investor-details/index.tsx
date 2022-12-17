/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IGlobalState } from '../../../redux/reducers'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { Spin } from 'antd'
import { IInvestorsState } from '../investors.reducer'
import {
	INVESTORS_ACTION_TYPES,
	IGetInvestorLocationsAction,
	IGetSingleInvestorsAction,
	ISetSingleInvestorAction,
} from '../investors.actions'
import { CollapseWrapper } from '../../../shared/components/disclosure'
import { SimpleData } from '../../../shared/components/simple-data'
import { Contact } from '../../../pages/Funds/contact'
import { formatPhone } from '../../../utils/format-phone'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import DetailTable from '../../../shared/detail-table'
import { formatLocation } from '../../../utils/format-location'

const InvestorDetails: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { investorId } = useParams()

	const { loading, selectedInvestor } = useSelector<IGlobalState, IInvestorsState>((state) => state.investors)

	useEffect(() => {
		if (investorId) {
			dispatch(
				GenericActionCreator<IGetSingleInvestorsAction>({
					type: INVESTORS_ACTION_TYPES.GET_INVESTOR,
					data: investorId,
				}),
			)
		}
	}, [investorId])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetInvestorLocationsAction>({
				type: INVESTORS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)
	}, [])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleInvestorAction>({
					type: INVESTORS_ACTION_TYPES.SET_INVESTOR,
					data: null,
				}),
			)
		}
	}, [])

	return (
		<Spin spinning={loading}>
			<div className='py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
					<div className='flex wrap justify-between items-center gap-2'>
						<div className='flex flex-col'>
							<div className='flex gap-1'>
								<span className='text-gray-700 font-bold'>
									{selectedInvestor?.company
										? selectedInvestor?.companyName
										: `${selectedInvestor?.firstName}, ${selectedInvestor?.lastName}`}
								</span>
							</div>
							<div className='flex flex-col gap-1'>
								<div className='text-gray-500 items-center flex gap-1'>
									<MailIcon className='w-3 h-3' />
									<span>{selectedInvestor?.email}</span>
								</div>
								<div className='text-gray-500 items-center flex gap-1'>
									<PhoneIcon className='w-3 h-3' />
									<span>{formatPhone(selectedInvestor?.phone as string)}</span>
								</div>
							</div>
						</div>

						<Button
							kind='transparent'
							onClick={() => navigate(`/investors/create-edit/${selectedInvestor?.investorId}`)}
						>
							Edit Investor
						</Button>
					</div>
					<CollapseWrapper
						ShowedContent={
							<div style={{ maxWidth: '800px' }} className='flex flex-col gap-6'>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData maxContent heading={'Email'} data={selectedInvestor?.email ?? ''} />
									<SimpleData
										heading={'Location'}
										data={formatLocation(
											selectedInvestor?.city as string,
											selectedInvestor?.state as string,
											selectedInvestor?.zipCode as string,
											selectedInvestor?.country as string,
										)}
									/>
									<SimpleData heading={'Phone Number'} data={formatPhone(selectedInvestor?.phone ?? '')} />
								</div>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500 font-medium'>Contacts</span>
									<div className='flex wrap gap-5'>
										{selectedInvestor?.contacts?.map((contact, i) => (
											<>
												<Contact withBorder={false} showActions={false} contact={contact} />
												{i !== (selectedInvestor?.contacts?.length ?? 0) - 1 && (
													<div className='w-px border border-gray-300' />
												)}
											</>
										))}
									</div>
								</div>
							</div>
						}
					/>
					<DetailTable data={selectedInvestor} />
				</div>
			</div>
		</Spin>
	)
})

export { InvestorDetails as default }
