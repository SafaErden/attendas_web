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
import { IQozbsState } from '../qozb.reducer'
import {
	QOZBS_ACTION_TYPES,
	IGetQozbTypesAction,
	IGetSingleQozbsAction,
	IGetQozbLocationsAction,
	IGetQozbEntityTypesAction,
	ISetSingleQozbAction,
} from '../qozbs.actions'
import dayjs from 'dayjs'
import { CollapseWrapper } from '../../../shared/components/disclosure'
import { SimpleData } from '../../../shared/components/simple-data'
import { Contact } from '../../../pages/Funds/contact'
import DetailTable from '../../../shared/detail-table'
import { Assets } from '../assets'
import { formatLocation } from '../../../utils/format-location'

const QozbDetails: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { qozbId } = useParams()

	const { loading, selectedQozb } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)

	useEffect(() => {
		if (qozbId) {
			dispatch(
				GenericActionCreator<IGetSingleQozbsAction>({
					type: QOZBS_ACTION_TYPES.GET_QOZB,
					data: qozbId,
				}),
			)
		}
	}, [qozbId])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQozbLocationsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetQozbEntityTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ENTITY_TYPES,
			}),
		)
	}, [])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleQozbAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB,
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
								<span className='text-gray-700 font-bold'>{selectedQozb?.businessName}</span>
							</div>
							<span className='text-gray-500'>#{`${selectedQozb?.businessId}`.padStart(7, '0')}</span>
							<span className='text-gray-500'>Created: {dayjs(selectedQozb?.createdOn).format('MM/DD/YYYY')}</span>
						</div>

						<Button kind='secondary' onClick={() => navigate(`/qozbs/create-edit/${selectedQozb?.businessId}`)}>
							Edit QOZB
						</Button>
					</div>
					<CollapseWrapper
						HidedContent={
							<div className='flex gap-8 flex-col'>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData heading={'Task ID Number'} data={selectedQozb?.taxId} />
									{/* <SimpleData heading={'Entity Type'} data={selectedQozb?.entityType?.entityTypeName} /> */}
									<SimpleData heading={'Is located in a OZ'} data={selectedQozb?.ozLocated ? 'Yes' : 'No'} />
									<SimpleData heading={'Is disregarded entity'} data={selectedQozb?.disregardedEntity ? 'Yes' : 'No'} />
									<SimpleData
										heading={'More than one shareholder'}
										data={selectedQozb?.moreThanOneShareholder ? 'Yes' : 'No'}
									/>
								</div>
								<div className='flex wrap gap-2 sm:gap-5'>
									{/* <SimpleData heading={'QOZB Property Owner'} data={selectedQozb?.propertyOwner?.propertyOwnerName} /> */}
									<SimpleData
										heading={'QOZB own or lease property'}
										data={selectedQozb?.ownsOrLeaseProperty ? 'Yes' : 'No'}
									/>
									<SimpleData
										heading={'QOZB take advantage of a tax credit'}
										data={selectedQozb?.taxCreditAdvantage ? 'Yes' : 'No'}
									/>
									<SimpleData
										heading={'QOZB take advantage of a tax credit'}
										data={selectedQozb?.taxCreditAdvantage ? 'Yes' : 'No'}
									/>
									<SimpleData
										heading={'QOZB have a statement of purpose'}
										data={selectedQozb?.hasPurposeStatement ? 'Yes' : 'No'}
									/>
								</div>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData
										heading={
											'QOF hold an interest of at least 5% in the profits and capital of the putative QOZB partnership'
										}
										data={selectedQozb?.qoFundHoldsInterest ? 'Yes' : 'No'}
									/>
									<SimpleData
										heading={'At least 70% of the tangible property of the QOZB located in an Oppurtunity Zone'}
										data={selectedQozb?.oZoneLocatedProperty ? 'Yes' : 'No'}
									/>
								</div>
							</div>
						}
						ShowedContent={
							<div style={{ maxWidth: '800px' }} className='flex flex-col gap-6'>
								<div className='flex wrap gap-2 sm:gap-5'>
									<SimpleData heading={'Type'} data={selectedQozb?.businessTypeId} />
									<SimpleData maxContent heading={'Email Address'} data={selectedQozb?.email} />{' '}
									<SimpleData heading={'Phone Number'} data={selectedQozb?.phone} />
									<SimpleData
										heading={'Location'}
										data={formatLocation(
											selectedQozb?.city as string,
											selectedQozb?.state as string,
											selectedQozb?.zipCode as string,
											selectedQozb?.country as string,
										)}
									/>
								</div>
								<div className='flex flex-col gap-2'>
									<span className='text-gray-500 font-medium'>Contacts</span>
									<div className='flex wrap gap-5'>
										{selectedQozb?.contacts?.map((contact, i) => (
											<>
												<Contact withBorder={false} showActions={false} contact={contact} />
												{i !== (selectedQozb?.contacts?.length ?? 0) - 1 && (
													<div className='w-px border border-gray-300' />
												)}
											</>
										))}
									</div>
								</div>
							</div>
						}
					/>
					<Assets />
					<DetailTable data={selectedQozb} />
				</div>
			</div>
		</Spin>
	)
})

export { QozbDetails as default }
