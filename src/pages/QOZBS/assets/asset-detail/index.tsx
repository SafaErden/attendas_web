/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	IGetAssetDetailAction,
	IGetAssetQuestionsAction,
	IGetSingleQozbsAction,
	QOZBS_ACTION_TYPES,
} from '../../qozbs.actions'
import { IQozbsState } from '../../qozb.reducer'
import { IGlobalState } from '../../../../redux/reducers'
import { GenericActionCreator } from '../../../../shared/action/generic.action'
import { Spin } from 'antd'
import { Button } from '../../../../shared/components/button'
import { AssetRelationView } from '../asset-relation-view'

const AssetDetails: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { qozbId, assetId } = useParams()

	const { assetsLoading, selectedAsset, selectedQozb } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)

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
		if (assetId) {
			dispatch(
				GenericActionCreator<IGetAssetDetailAction>({
					type: QOZBS_ACTION_TYPES.GET_ASSET_DETAIL,
					data: assetId,
				}),
			)
		}
	}, [assetId])

	useEffect(() => {
		if (assetId) {
			dispatch(
				GenericActionCreator<IGetAssetQuestionsAction>({
					type: QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS,
					data: assetId,
				}),
			)
		}
	}, [assetId])

	return (
		<Spin spinning={assetsLoading}>
			<div className='py-6'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
					<div className='flex flex-col gap-6'>
						<div className='flex wrap justify-between items-center gap-2'>
							<div className='flex flex-col'>
								<span className='text-gray-700 font-bold'>Related QOZB ID: {selectedQozb?.businessId}</span>
								<span className='text-gray-700 font-bold'>Related QOZB Name: {selectedQozb?.businessName}</span>
								<span className='text-gray-700 font-bold'>Asset Name: {selectedAsset?.assetName}</span>
								<span className='text-gray-700 font-bold'>Asset Type: {selectedAsset?.assetType.assetTypeName}</span>
								<span className='text-gray-700 font-bold'>
									Asset Description: {selectedAsset?.assetDescription ?? '-'}
								</span>
							</div>

							<div className='flex items-center gap-2'>
								<Button
									kind='transparent'
									onClick={() =>
										navigate(`/qozbs/assets/create-edit/${selectedAsset?.businessId}/${selectedAsset?.assetId}`)
									}
								>
									Edit Asset
								</Button>
							</div>
						</div>
					</div>

					<AssetRelationView />
				</div>
			</div>
		</Spin>
	)
})

export { AssetDetails as default }
