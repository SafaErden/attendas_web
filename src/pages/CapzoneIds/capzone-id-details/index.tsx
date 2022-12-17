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
import { ICapzoneIdsState } from '../capzoneIds.reducer'
import {
	CAPZONEIDS_ACTION_TYPES,
	IGetCapzoneIdDetailInfoAction,
	IGetSingleCapzoneIdsAction,
	ISetSingleCapzoneIdAction,
} from '../capzoneIds.actions'
import dayjs from 'dayjs'
import { CapzoneIdsDetailCard } from './capzoneIds-details-card'
import { useMediaQuery } from '../../../hooks/use-media-query'
import { ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { CapzoneIdDetailsSummary } from './capzoneId-details-summary'
import { ICapzoneId } from '../capzoneIds'
import { CapzoneIdDetailsRelations } from './capzoneId-details-relations'

const CapzoneIdDetails: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { capzoneId } = useParams()
	const { isMobile, isTablet } = useMediaQuery()

	const { loading, selectedCapzoneId, fund, qozb, investor } = useSelector<IGlobalState, ICapzoneIdsState>(
		(state) => state.capzoneIds,
	)

	useEffect(() => {
		if (capzoneId) {
			dispatch(
				GenericActionCreator<IGetSingleCapzoneIdsAction>({
					type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID,
					data: capzoneId,
				}),
			)
		}
	}, [capzoneId])

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {
		if (selectedCapzoneId?.capZoneId) {
			dispatch(
				GenericActionCreator<IGetCapzoneIdDetailInfoAction>({
					type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID_DETAIL_INFO,
					data: selectedCapzoneId,
				}),
			)
		}
	}, [selectedCapzoneId?.capZoneId])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID,
					data: null,
				}),
			)
		}
	}, [])

	return (
		<Spin spinning={loading}>
			<div className='py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
					<div className='flex flex-col gap-6'>
						<div className='flex wrap justify-between items-center gap-2'>
							<div className='flex flex-col'>
								<span className='text-gray-700 font-bold'>CapZone ID #{selectedCapzoneId?.capZoneId}</span>

								<span className='text-gray-500'>
									Date of last input:{' '}
									{selectedCapzoneId?.dateOfLastInput
										? dayjs(selectedCapzoneId?.dateOfLastInput).format('MM/DD/YYYY')
										: '-'}
								</span>
								<span className='text-gray-500'>
									Created: {dayjs(selectedCapzoneId?.createdOn).format('MM/DD/YYYY')}
								</span>
								<span className='text-gray-500'>Date of last input: {selectedCapzoneId?.userOfLastInput ?? '-'}</span>
							</div>

							<div className='flex items-center gap-2'>
								<Button
									kind='transparent'
									onClick={() => navigate(`/capzoneIds/create-edit/${selectedCapzoneId?.capZoneId}`)}
								>
									Edit CapZone ID
								</Button>
								<Button onClick={() => navigate(`/capzoneIds/create-edit/${selectedCapzoneId?.capZoneId}`)}>
									Generate Report
								</Button>
							</div>
						</div>

						<div className='flex gap-2 flex-col lg:flex-row'>
							<CapzoneIdsDetailCard data={investor} />
							{isTablet || isMobile ? (
								<ArrowDownIcon className='text-blue-900 h-5 w-5 m-auto' />
							) : (
								<ArrowRightIcon className='text-blue-900 h-5 w-5 m-auto' />
							)}
							<CapzoneIdsDetailCard data={fund} />
							{isTablet || isMobile ? (
								<ArrowDownIcon className='text-blue-900 h-5 w-5 m-auto' />
							) : (
								<ArrowRightIcon className='text-blue-900 h-5 w-5 m-auto' />
							)}

							<CapzoneIdsDetailCard data={qozb} />
						</div>

						<CapzoneIdDetailsSummary capzoneId={selectedCapzoneId as ICapzoneId} />

						<CapzoneIdDetailsRelations />
					</div>
				</div>
			</div>
		</Spin>
	)
})

export { CapzoneIdDetails as default }
