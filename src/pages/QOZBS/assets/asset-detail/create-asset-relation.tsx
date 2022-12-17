/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	ICreateOrUpdateAssetRelationAction,
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
import { newQuestionRenderer } from '../../../../pages/CapzoneIds/question-renderer'
import { Form, Formik } from 'formik'
import PageLayout from '../../../../shared/components/page-layout'
import { Text } from '../../../../shared/components/text'
import {
	createInitialValuesFromRelation,
	newRelationSubmitHandler,
} from '../../../../pages/CapzoneIds/relation-submit-handler'
import { IAnyQuestions } from '../../qozbs'
import { IQuestion } from '@src/pages/CapzoneIds/capzoneIds'

export const CreateAssetRelation: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { assetId } = useParams()

	const { assetsLoading, selectedAsset, selectedQozb, assetQuestions, assetRelations } = useSelector<
		IGlobalState,
		IQozbsState
	>((state) => state.qozbs)

	const isRelation = (assetRelations.answers ?? []).some((answer: IQuestion) => {
		return !!answer.values.find((val) => val.id === 'value')?.value
	})

	const handleSubmit = (values: IAnyQuestions) => {
		const res = newRelationSubmitHandler(values.answers)

		dispatch(
			GenericActionCreator<ICreateOrUpdateAssetRelationAction>({
				type: QOZBS_ACTION_TYPES.CREATE_OR_UPDATE_ASSET_RELATIONS,
				data: {
					assetId: assetId ?? '',
					answers: res,
					isRelation,
					qozbId: (selectedQozb?.businessId as string) ?? '',
				},
			}),
		)
	}

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

	useEffect(() => {
		if (selectedAsset?.businessId) {
			dispatch(
				GenericActionCreator<IGetSingleQozbsAction>({
					type: QOZBS_ACTION_TYPES.GET_QOZB,
					data: selectedAsset?.businessId,
				}),
			)
		}
	}, [selectedAsset?.businessId])

	const questions: IQuestion[] = assetRelations.answers.length ? assetRelations.answers : assetQuestions

	return (
		<Spin spinning={assetsLoading}>
			<div className='py-6'>
				<div className='flex flex-col gap-6 px-8'>
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

				<Formik<IAnyQuestions>
					onSubmit={handleSubmit}
					initialValues={createInitialValuesFromRelation(questions, assetId || '')}
					enableReinitialize
				>
					{({ values }) => {
						return (
							<Form>
								<PageLayout
									showButton={false}
									name={
										<div className='flex flex-col gap-3'>
											<Text size='lg' weight='semiBold' color='headingNormal'>
												Asset Relationship
											</Text>
										</div>
									}
								>
									<div className='flex flex-col gap-5 bg-white p-8 rounded'>
										{questions.map((question, ind) => {
											return newQuestionRenderer(question, ind, values.answers)
										})}{' '}
									</div>
									<div className='mt-5'>
										<Button iconPosition='start' Icon={<span>+</span>} type='submit'>
											{isRelation ? 'Save Relationship' : 'Create Relationship'}
										</Button>
									</div>
								</PageLayout>
							</Form>
						)
					}}
				</Formik>
			</div>
		</Spin>
	)
})
