/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { memo, NamedExoticComponent, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import { useNavigate, useParams } from 'react-router-dom'
import { ICreateOrUpdateAssetRelationAction, IGetAssetQuestionsAction, QOZBS_ACTION_TYPES } from '../qozbs.actions'
import { IAnyQuestions } from '../qozbs'
import {
	createInitialValuesFromRelation,
	newRelationSubmitHandler,
} from '../../../pages/CapzoneIds/relation-submit-handler'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { Text } from '../../../shared/components/text'
import { newQestionAndAnswersRenderer } from '../../../pages/CapzoneIds/question-renderer'
import { Button } from '../../../shared/components/button'
import { IQuestion } from '@src/pages/CapzoneIds/capzoneIds'

export const AssetRelationView: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { assetId, qozbId } = useParams()
	const navigate = useNavigate()

	const { assetsLoading, assetRelations, assetQuestions } = useSelector((state: IGlobalState) => state.qozbs)
	const questions: IQuestion[] = assetRelations.answers.length > 0 ? assetRelations.answers : assetQuestions

	const isRelation = (assetRelations.answers ?? []).some((answer: IQuestion) => {
		return !!answer?.values.find((val) => val.id === 'value')?.value
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
					qozbId: qozbId as string,
				},
			}),
		)
	}

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetAssetQuestionsAction>({
				type: QOZBS_ACTION_TYPES.GET_ASSET_QUESTIONS,
				data: assetId ?? '',
			}),
		)
	}, [])

	return (
		<Spin spinning={assetsLoading}>
			<div className='flex items-center justify-end mb-3'>
				<Button onClick={() => navigate(`/qozbs/assets/create-edit-relation/${assetId}`)}>
					{isRelation ? 'Edit Relation' : 'Create relation'}
				</Button>
			</div>
			<Formik<IAnyQuestions>
				initialValues={createInitialValuesFromRelation(questions, assetId || '')}
				enableReinitialize
				onSubmit={handleSubmit}
				validationSchema={{}}
			>
				{({ values }) => {
					return (
						<Form>
							<div className='mt-3'>
								<div className='flex border-gray-200 border-b pb-3'>
									<div className='flex-2'>
										<Text weight='light' color='lightGray'>
											QUESTION/ANSWER
										</Text>
									</div>
									<div className='flex-1'>
										<Text weight='light' color='lightGray'>
											ADDITIONAL NOTE
										</Text>
									</div>
									<div className='flex-1'>
										<Text weight='light' color='lightGray'>
											RECOMMENDATION
										</Text>
									</div>
								</div>
								<div className='flex flex-col'>
									{questions.map((q, index) => newQestionAndAnswersRenderer(q, index, () => handleSubmit(values)))}
								</div>
							</div>
						</Form>
					)
				}}
			</Formik>
		</Spin>
	)
})
