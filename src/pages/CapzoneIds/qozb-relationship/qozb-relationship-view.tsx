/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { memo, NamedExoticComponent, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { Spin } from 'antd'
import { capzoneIdQOZBRelationValidatioSchema } from './qozb-relationship.constants'
import { Text } from '../../../shared/components/text'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import { newQestionAndAnswersRenderer } from '../question-renderer'
import { createInitialValuesFromRelation, newRelationSubmitHandler } from '../relation-submit-handler'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { CAPZONEIDS_ACTION_TYPES, IGetQOZBQuestionsAction, IUpdateQOZBQuestionsAction } from '../capzoneIds.actions'
import { useParams } from 'react-router-dom'
import { IAnyQuestions } from '@src/pages/QOZBS/qozbs'

const QOZBRelationshipView: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { capzoneId } = useParams()
	const { qozbQuestions, loading } = useSelector((state: IGlobalState) => state.capzoneIds)
	const handleSubmit = (values: IAnyQuestions) => {
		const res = newRelationSubmitHandler(values.answers)

		dispatch(
			GenericActionCreator<IUpdateQOZBQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.UPDATE_QOZB_QUESTIONS,
				data: {
					relations: res,
					czidId: capzoneId,
				},
			}),
		)
	}

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetQOZBQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_QOZB_QUESTIONS,
				data: capzoneId,
			}),
		)
	}, [])

	return (
		<Spin spinning={loading}>
			<Formik<IAnyQuestions>
				initialValues={createInitialValuesFromRelation(qozbQuestions)}
				enableReinitialize
				onSubmit={handleSubmit}
				validationSchema={capzoneIdQOZBRelationValidatioSchema}
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
									{qozbQuestions.map((question, ind) =>
										newQestionAndAnswersRenderer(question, ind, () => handleSubmit(values)),
									)}
								</div>
							</div>
						</Form>
					)
				}}
			</Formik>
		</Spin>
	)
})

export { QOZBRelationshipView as default }
