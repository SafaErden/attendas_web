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
	IGetQozbAssetsAction,
	IGetAllAssetsAction,
	IGetAssetTypesAction,
	IDeactivateAssetAction,
	IActivateAssetAction,
} from '../qozbs.actions'
import { Heading } from '../../../shared/components/heading'
import { Table } from '../../../shared/components/table'
import { IPagination } from '../../../shared/pagination/pagination.reducer'
import { IColumn } from '../../../shared/types'
import PageLayout from '../../../shared/components/page-layout'
import { IAsset } from '../qozbs'
import { TableActions } from '../../../shared/components/table-actions'
import { AllAssetsFilter } from './all-assets-filter'
import { ISetPageAction, PAGINATION_ACTION_TYPES } from '../../../shared/pagination/pagination.actions'
import { toggleModalVisibility } from '../../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../../shared/components/modal/modal.contsants'
import { TableButtons } from '../../../shared/components/table-action-buttons'
import { PencilIcon, DocumentSearchIcon, TrashIcon } from '@heroicons/react/solid'
import { PauseIcon, PlayIcon } from '@heroicons/react/outline'
import { ISetDeleteData, USERS_ACTION_TYPES } from '../../../pages/Users/users.actions'

const columns = (): IColumn<IAsset>[] => [
	{
		title: 'ASSET',
		render: (row: IAsset) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>{row.assetName}</span>
				<span className='text-gray-500'>{row.assetType.assetTypeName}</span>
			</div>
		),
	},
	{
		title: 'COMPLIANCE',
		render: () => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-500'>{'-'}</span>
			</div>
		),
	},
	{
		title: 'VALUE',
		render: (row: IAsset) => (
			<div className='flex gap-1 justify-center flex-col'>
				<span className='text-gray-900'>${row.value ?? 0}</span>
			</div>
		),
	},
]

export const Assets: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { qozbId } = useParams()
	const { assetsLoading, assets, allAssets, allAssetsFilter } = useSelector<IGlobalState, IQozbsState>(
		(state) => state.qozbs,
	)
	const { currentPage } = useSelector<IGlobalState, IPagination>((state) => state.pagination.assets)

	const onActivateOrDeactivateClick = (assetId: string, qozbId: string, isActive: boolean) => {
		if (isActive) {
			dispatch(
				GenericActionCreator<IDeactivateAssetAction>({
					type: QOZBS_ACTION_TYPES.DEACTIVATE_ASSET,
					data: {
						qozbId: qozbId ?? '',
						assetId,
					},
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IActivateAssetAction>({
					type: QOZBS_ACTION_TYPES.ACTIVATE_ASSET,
					data: {
						qozbId: qozbId ?? '',
						assetId,
					},
				}),
			)
		}
	}

	const handleDelete = (row: IAsset) => {
		dispatch(
			GenericActionCreator<ISetDeleteData>({
				type: USERS_ACTION_TYPES.SET_DELETE_DATA,
				data: {
					deleteId: row.assetId,
					stateName: 'assets',
					itemName: row.assetName,
					qozbId: row.businessId,
				},
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.DELETE_DATA))
	}

	const actions = (row: IAsset) => {
		return (
			<TableActions>
				<TableButtons
					Icon={<PencilIcon className='w-4 h-4' />}
					onClick={() => navigate(`/qozbs/assets/create-edit/${row.businessId}/${row.assetId}`)}
					kind='edit'
				>
					Edit
				</TableButtons>
				<TableButtons
					Icon={<DocumentSearchIcon className='w-4 h-4' />}
					onClick={() => navigate(`/qozbs/${row.businessId}/assets/detail/${row.assetId}`)}
					kind='details'
				>
					Details
				</TableButtons>
				<TableButtons
					Icon={row.active ? <PauseIcon className='w-4 h-4' /> : <PlayIcon className='w-4 h-4' />}
					kind={row.active ? 'deactivate' : 'activate'}
					onClick={() => onActivateOrDeactivateClick(row.assetId, row.businessId, row.active)}
				>
					{row.active ? 'Deactivate' : 'Activate'}
				</TableButtons>
				<TableButtons Icon={<TrashIcon className='w-4 h-4' />} kind='delete' onClick={() => handleDelete(row)}>
					Delete
				</TableButtons>
			</TableActions>
		)
	}

	useEffect(() => {
		if (qozbId) {
			dispatch(
				GenericActionCreator<IGetQozbAssetsAction>({
					type: QOZBS_ACTION_TYPES.GET_QOZB_ASSETS,
					data: qozbId,
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IGetAllAssetsAction>({
					type: QOZBS_ACTION_TYPES.GET_ALL_ASSETS,
					data: {
						...allAssetsFilter,
						page: currentPage,
						size: 10,
					},
				}),
			)
		}
	}, [qozbId, allAssetsFilter, currentPage])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetAssetTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_TYPES,
			}),
		)

		return () => {
			dispatch(
				GenericActionCreator<ISetPageAction>({
					type: PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE,
					data: {
						stateName: 'assets',
						pageNumber: 1,
					},
				}),
			)
		}
	}, [])

	const renderTable = () => (
		<div className='flex flex-col relative'>
			{!qozbId && <AllAssetsFilter />}
			<Table
				dataKey='assetId'
				stateName='assets'
				tableActions={actions}
				data={qozbId ? assets.assets : allAssets.assets}
				count={qozbId ? assets.count : allAssets.count}
				columns={columns()}
				assetType={qozbId && 'qozb'}
			/>
		</div>
	)

	return (
		<Spin spinning={assetsLoading}>
			<div className='flex justify-between items-center mt-5'>
				{qozbId && <Heading size='xl'>Assets</Heading>}
				{qozbId && (
					<div>
						<Button kind='transparent' onClick={() => navigate('/qozbs/assets/all')}>
							View all Assets
						</Button>
						<Button onClick={() => navigate(`/qozbs/assets/create-edit/${qozbId}`)}>Create new asset</Button>
					</div>
				)}
			</div>

			{qozbId ? (
				renderTable()
			) : (
				<PageLayout showButton={false} name='Assets'>
					{renderTable()}
				</PageLayout>
			)}
		</Spin>
	)
})
