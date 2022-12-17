/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import { Spin } from 'antd'
import {
	IAddAssetAction,
	IGetAssetDetailAction,
	IGetAssetTypesAction,
	ISetAssetDetailAction,
	IUpdateAssetAction,
	QOZBS_ACTION_TYPES,
} from '../../../../pages/QOZBS/qozbs.actions'
import { IAsset } from '../../../../pages/QOZBS/qozbs'
import { assetInitialValues, assetValidationSchema } from './create-edit-asset-constants'
import { useParams } from 'react-router-dom'
import { GenericActionCreator } from '../../../../shared/action/generic.action'
import { IGlobalState } from '../../../../redux/reducers'
import { IQozbsState } from '../../../../pages/QOZBS/qozb.reducer'
import PageLayout from '../../../../shared/components/page-layout'
import { RadioGroupWithBorder } from '../../../../shared/components/radio-group-with-border'
import { OneColumnRow } from '../../../../shared/components/one-column-row'
import { FormInput } from '../../../../shared/components/form-input'
import { Button } from '../../../../shared/components/button'
import { FormTextAreaInput } from '../../../../shared/components/formTextAreaInput'

const CreateEditAsset: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { qozbId, assetId } = useParams()

	const { assetTypes, assetsLoading, selectedAsset } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)

	useEffect(() => {
		if (assetId) {
			dispatch(
				GenericActionCreator<IGetAssetDetailAction>({
					type: QOZBS_ACTION_TYPES.GET_ASSET_DETAIL,
					data: assetId,
				}),
			)
		}
	}, [qozbId, assetId])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetAssetTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_TYPES,
			}),
		)
		return () => {
			dispatch(
				GenericActionCreator<ISetAssetDetailAction>({
					type: QOZBS_ACTION_TYPES.SET_ASSET_DETAIL,
					data: null,
				}),
			)
		}
	}, [])

	const handleSubmit = (formValues: Partial<IAsset>) => {
		const values = Object.keys(formValues).reduce((acc: any, key: any) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (formValues[key]) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				acc[key] = formValues[key]
			}

			return acc
		}, {})

		if (assetId && qozbId) {
			dispatch(
				GenericActionCreator<IUpdateAssetAction>({
					type: QOZBS_ACTION_TYPES.UPDATE_ASSET,
					data: {
						qozbId,
						assetId,
						data: values,
					},
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<IAddAssetAction>({
					type: QOZBS_ACTION_TYPES.ADD_ASSET,
					data: {
						qozbId: qozbId ?? '',
						data: values,
					},
				}),
			)
		}
	}

	return (
		<Spin spinning={assetsLoading}>
			<PageLayout showButton={false} name={`${assetId ? 'Edit the' : 'Create a'} Asset`}>
				<Formik<Partial<IAsset>>
					initialValues={assetInitialValues(selectedAsset, assetTypes)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={assetValidationSchema}
				>
					{() => {
						return (
							<Form>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<div style={{ maxWidth: '504px' }} className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
										<OneColumnRow maxWidth='504px'>
											<RadioGroupWithBorder
												name='assetTypeId'
												label='Asset Type'
												options={assetTypes.map((assetType) => ({
													id: assetType.assetTypeId,
													name: assetType.assetTypeName,
													description: assetType.assetTypeDescription,
												}))}
											/>
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='assetName' label='Asset Name' placeholder='Asset Name...' type='text' />
										</OneColumnRow>

										<OneColumnRow maxWidth='504px'>
											<FormTextAreaInput name='assetDescription' label='Asset Description' rows={4} cols={50} />
										</OneColumnRow>
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{assetId ? 'Save Asset' : '+ Create Asset'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditAsset as default }
