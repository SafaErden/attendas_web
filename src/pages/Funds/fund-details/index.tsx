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
import { IFundsState } from '../funds.reducer'
import {
	FUNDS_ACTION_TYPES,
	IGetEntityTypesAction,
	IGetFundTypesAction,
	IGetLocationsAction,
	IGetSingleFundsAction,
	ISetSingleFundAction,
} from '../funds.actions'
import { IContact } from '../funds'
import { Badge } from '../../../shared/components/badge'
import dayjs from 'dayjs'
import { CollapseWrapper } from '../../../shared/components/disclosure'
import { SimpleData } from '../../../shared/components/simple-data'
import { Contact } from '../contact'
import DetailTable from '../../../shared/detail-table'
import { formatLocation } from '../../../utils/format-location'

const FundDetails: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { fundId } = useParams()

	const { loading, selectedFund } = useSelector<IGlobalState, IFundsState>((state) => state.funds)

	useEffect(() => {
		if (fundId) {
			dispatch(
				GenericActionCreator<IGetSingleFundsAction>({
					type: FUNDS_ACTION_TYPES.GET_FUND,
					data: fundId,
				}),
			)
		}
	}, [fundId])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetLocationsAction>({
				type: FUNDS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetFundTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_FUND_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetEntityTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_ENTITY_TYPES,
			}),
		)
	}, [])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleFundAction>({
					type: FUNDS_ACTION_TYPES.SET_FUND,
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
									{selectedFund?.fundName}, {selectedFund?.entityType?.entityTypeName}
								</span>
								<Badge title={selectedFund?.active ? 'Active' : 'Not Active'} type={selectedFund?.active ? 2 : 4} />
							</div>
							{!!selectedFund?.capzoneId && (
								<span className='text-gray-500'>CapZone ID #{`${selectedFund?.capzoneId}`.padStart(7, '0')}</span>
							)}
							<span className='text-gray-500'>Created: {dayjs(selectedFund?.createdOn).format('MM/DD/YYYY')}</span>
							<span className='text-gray-500'>{selectedFund?.fundType.fundTypeName}</span>
						</div>

						<Button kind='secondary' onClick={() => navigate(`/funds/create-edit/${selectedFund?.fundId}`)}>
							Edit Fund
						</Button>
					</div>
					<CollapseWrapper
						HidedContent={
							<div className='flex gap-8 flex-col'>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData
										heading={'Date of Formation'}
										data={selectedFund?.formationDate ? dayjs(selectedFund?.formationDate).format('MM/DD/YYYY') : '-'}
									/>
									<SimpleData
										heading={'Date of elected QOF certification'}
										data={
											selectedFund?.certificationDate
												? dayjs(selectedFund?.certificationDate).format('MM/DD/YYYY')
												: '-'
										}
									/>
									<SimpleData heading={'Entity type'} data={selectedFund?.entityType?.entityTypeName ?? '-'} />
									<SimpleData heading={'Overseas Investors'} data={selectedFund?.overseaInvestor ? 'Yes' : 'No'} />
								</div>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData
										heading={'QOF Tax Year'}
										data={selectedFund?.qofTaxYear ? dayjs(selectedFund?.qofTaxYear).format('MM/DD/YYYY') : '-'}
									/>
									<SimpleData
										heading={'First tax year longer than 6 months'}
										data={selectedFund?.firstTaxInSixMonths ? 'Yes' : 'No'}
									/>
								</div>
							</div>
						}
						ShowedContent={
							<div style={{ maxWidth: '800px' }} className='flex flex-col gap-6'>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData heading={'Employer Id'} data={selectedFund?.employerId ?? ''} />
									<SimpleData maxContent heading={'Email Address'} data={selectedFund?.email ?? ''} />
									<SimpleData heading={'Phone Number'} data={selectedFund?.phone} />
									<SimpleData
										heading={'Location'}
										data={formatLocation(
											selectedFund?.city as string,
											selectedFund?.state as string,
											selectedFund?.zipCode as string,
											selectedFund?.country as string,
										)}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500 font-medium'>Contacts</span>
									<div className='flex wrap gap-5'>
										{selectedFund?.contacts?.map((contact, i) => (
											<>
												<Contact withBorder={false} showActions={false} contact={contact} />
												{i !== (selectedFund?.contacts?.length ?? 0) - 1 && (
													<div className='w-px border border-gray-300' />
												)}
											</>
										))}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500 font-medium'>Assigned To</span>

									<Contact
										maxWidth='300px'
										useTag
										withBorder={false}
										showActions={false}
										contact={selectedFund?.createdByUser as IContact}
									/>
								</div>
							</div>
						}
					/>
					<DetailTable data={selectedFund} />
				</div>
			</div>
		</Spin>
	)
})

export { FundDetails as default }
