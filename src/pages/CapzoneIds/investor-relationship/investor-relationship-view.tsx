/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { memo, NamedExoticComponent, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { Spin } from 'antd'
import { capzoneIdInvestorRelationValidatioSchema } from './investor-relationship.constants'
import { Text } from '../../../shared/components/text'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import { newQestionAndAnswersRenderer } from '../question-renderer'
import { createInitialValuesFromRelation, newRelationSubmitHandler } from '../relation-submit-handler'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import {
	CAPZONEIDS_ACTION_TYPES,
	IGetInvestorQuestionsAction,
	IUpdateInvestorQuestionsAction,
} from '../capzoneIds.actions'
import { useParams } from 'react-router-dom'
import { IAnyQuestions } from '@src/pages/QOZBS/qozbs'

const InvestorRelationshipView: NamedExoticComponent = memo(() => {
	const { investorQuestions, loading } = useSelector((state: IGlobalState) => state.capzoneIds)
	const dispatch = useDispatch()
	const { capzoneId } = useParams()

	const handleSubmit = (values: IAnyQuestions) => {
		const res = newRelationSubmitHandler(values.answers)

		dispatch(
			GenericActionCreator<IUpdateInvestorQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.UPDATE_INVESTOR_QUESTIONS,
				data: {
					relations: res,
					czidId: capzoneId,
				},
			}),
		)
	}

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetInvestorQuestionsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_INVESTOR_QUESTIONS,
				data: capzoneId,
			}),
		)
	}, [])

	return (
		<Spin spinning={loading}>
			<Formik<IAnyQuestions>
				initialValues={createInitialValuesFromRelation(investorQuestions)}
				enableReinitialize
				onSubmit={handleSubmit}
				validationSchema={capzoneIdInvestorRelationValidatioSchema}
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
									{investorQuestions.map((question, index) =>
										newQestionAndAnswersRenderer(question, index, () => handleSubmit(values)),
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

export { InvestorRelationshipView as default }
