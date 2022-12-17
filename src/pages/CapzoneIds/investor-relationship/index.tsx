/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import { memo, NamedExoticComponent, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { Button } from '../../../shared/components/button'
import { Spin } from 'antd'
import { capzoneIdInvestorRelationValidatioSchema } from './investor-relationship.constants'
import { newQuestionRenderer } from '../question-renderer'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import PageLayout from '../../../shared/components/page-layout'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom'
import { Text } from '../../../shared/components/text'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import {
	CAPZONEIDS_ACTION_TYPES,
	IGetInvestorQuestionsAction,
	IUpdateInvestorQuestionsAction,
} from '../capzoneIds.actions'
import { createInitialValuesFromRelation, newRelationSubmitHandler } from '../relation-submit-handler'
import { IAnyQuestions } from '@src/pages/QOZBS/qozbs'

const InvestorRelationship: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()

	const { capzoneId } = useParams()

	const { investorQuestions, isRelation, loading } = useSelector((state: IGlobalState) => state.capzoneIds)

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
							<PageLayout
								showButton={false}
								name={
									<div className='flex flex-col gap-3'>
										<Text size='lg' weight='semiBold' color='headingNormal'>
											Investor Relationship
										</Text>
										<div className='flex gap-3 items-center text-sm text-gray-500 font-light'>
											<span>Capzone ID: #{capzoneId}</span>
											<ChevronRightIcon className='w-3 h-3 text-gray-500' />
											<span>investor relationship</span>
										</div>
									</div>
								}
							>
								<div className='flex flex-col gap-5 bg-white p-8 rounded'>
									{investorQuestions.map((question, ind) => newQuestionRenderer(question, ind, values.answers))}
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
		</Spin>
	)
})

export { InvestorRelationship as default }
