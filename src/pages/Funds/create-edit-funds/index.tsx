/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { initialValues, fundValidatioSchema } from './create-edit-funds.constants'
import { FormInput } from '../../../shared/components/form-input'
import { FormSelectInput } from '../../../shared/components/form-select-input'
import { IGlobalState } from '../../../redux/reducers'
import PageLayout from '../../../shared/components/page-layout'
import { useParams } from 'react-router-dom'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { TwoColumnRow } from '../../../shared/components/two-colum-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { Spin } from 'antd'
import { IFundsState } from '../funds.reducer'
import {
	FUNDS_ACTION_TYPES,
	ICreateFundAction,
	IDeleteFundContactAction,
	IEditFundAction,
	IGetEntityTypesAction,
	IGetFundsQuestionsAction,
	IGetFundTypesAction,
	IGetLocationsAction,
	IGetSingleFundsAction,
	ISetContactsAction,
	ISetSelectedContactAction,
	ISetSingleFundAction,
} from '../funds.actions'
import { IContact, IFund } from '../funds'
import { RadioGroupWithBorder } from '../../../shared/components/radio-group-with-border'
import { FormTextAreaInput } from '../../../shared/components/formTextAreaInput'
import { Contact } from '../contact'
import { MODAL_NAMES } from '../../../shared/components/modal/modal.contsants'
import { toggleModalVisibility } from '../../../shared/components/modal/modal.actions'
import { Modal } from '../../../shared/components/modal'
import CreateEditContact from '../create-edit-contact'
import { newQuestionRenderer } from '../../../pages/CapzoneIds/question-renderer'
import { newRelationSubmitHandler } from '../../../pages/CapzoneIds/relation-submit-handler'
import { IQuestion } from '@src/pages/CapzoneIds/capzoneIds'

const CreateEditFund: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { fundId } = useParams()

	const { fundTypes, locations, loading, selectedFund, contacts, selectedContact, fundsQuestions } = useSelector<
		IGlobalState,
		IFundsState
	>((state) => state.funds)

	const locationsWithEmptyState = [{ state: '', stateName: 'Select State' }, ...locations]
	const answers = selectedFund?.answers

	useEffect(() => {
		if (fundId) {
			dispatch(
				GenericActionCreator<IGetSingleFundsAction>({
					type: FUNDS_ACTION_TYPES.GET_FUND,
					data: fundId,
				}),
			)
		}
	}, [fundId])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleFundAction>({
					type: FUNDS_ACTION_TYPES.SET_FUND,
					data: null,
				}),
			)
			dispatch(
				GenericActionCreator<ISetContactsAction>({
					type: FUNDS_ACTION_TYPES.SET_CONTACTS,
					data: [],
				}),
			)
		}
	}, [])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetLocationsAction>({
				type: FUNDS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetFundTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_FUND_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetEntityTypesAction>({
				type: FUNDS_ACTION_TYPES.GET_ENTITY_TYPES,
			}),
		)
		dispatch(
			GenericActionCreator<IGetFundsQuestionsAction>({
				type: FUNDS_ACTION_TYPES.GET_FUNDS_QUESTIONS,
			}),
		)
	}, [])

	const handleSubmit = (values: Partial<IFund>) => {
		const formValues = Object.keys(values).reduce((acc: any, key: any) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (values[key]) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				acc[key] = values[key]
			}

			return acc
		}, {})
		if (fundId) {
			dispatch(
				GenericActionCreator<IEditFundAction>({
					type: FUNDS_ACTION_TYPES.EDIT_FUND,
					data: {
						...formValues,
						contacts: selectedFund?.contacts?.map((c) => ({
							...c,
							contactRoleId: c.contactRole?.contactRoleId,
							contactRole: undefined,
						})),
						answers: newRelationSubmitHandler(formValues.answers),
					},
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<ICreateFundAction>({
					type: FUNDS_ACTION_TYPES.CREATE_FUND,
					data: {
						...formValues,
						contacts: contacts.map((c) => ({ ...c, tempId: undefined, contactRole: undefined })),
						answers: newRelationSubmitHandler(formValues.answers),
					},
				}),
			)
		}
	}

	const handleContactEdit = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<ISetSelectedContactAction>({
				type: FUNDS_ACTION_TYPES.SET_SELECTED_CONTACT,
				data: contact,
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.CONTACT))
	}

	const handleContactDelete = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<IDeleteFundContactAction>({
				type: FUNDS_ACTION_TYPES.DELETE_FUND_CONTACT,
				data: {
					fundId: selectedFund && contact.contactId ? selectedFund.fundId : undefined,
					contactId: (contact.contactId ?? contact.tempId) as string,
				},
			}),
		)
	}
	return (
		<Spin spinning={loading}>
			<PageLayout showButton={false} name={`${fundId ? 'Edit the' : 'Create a'} Fund`}>
				<Formik<Partial<IFund>>
					initialValues={initialValues(selectedFund, fundTypes, locationsWithEmptyState, answers || fundsQuestions)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={fundValidatioSchema}
				>
					{({ values }) => {
						return (
							<Form>
								<Modal
									stateName={MODAL_NAMES.CONTACT}
									title={selectedContact?.contactId ? 'Edit Contact' : 'Add a Contact'}
								>
									<CreateEditContact />
								</Modal>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<div style={{ maxWidth: '504px' }} className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
										<OneColumnRow maxWidth='504px'>
											<RadioGroupWithBorder
												name='fundTypeId'
												label='Fund Type'
												options={fundTypes.map((f) => ({
													id: f.fundTypeId,
													name: f.fundTypeName,
													description: f.fundTypeDescription,
												}))}
											/>
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='fundName' label='Fund Name' placeholder='Fund Name...' type='text' />
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='employerId' label='Employer ID' placeholder='Employer ID...' type='text' />
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='street' label='Street Address' placeholder='e.g. Country Road 151' type='text' />
										</OneColumnRow>
										<TwoColumnRow>
											<FormInput name='city' label='City' placeholder='Seatle...' type='text' />

											<FormSelectInput
												name='state'
												label='State'
												options={locationsWithEmptyState.map((l) => ({ id: l.state, name: l.stateName }))}
											/>
										</TwoColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='zipCode' label='ZIP Code / Postal Code' placeholder='12789' type='text' />
										</OneColumnRow>
										<div style={{ maxWidth: '504px' }} className='mb-2 flex align-center justify-between'>
											<span className='text-gray-900 font-medium'>Contacts</span>
											<span
												onClick={() => dispatch(toggleModalVisibility(MODAL_NAMES.CONTACT))}
												className='cursor-pointer text-blue-800'
											>
												+ New Contact
											</span>
										</div>
										<div className='flex flex-col gap-3'>
											{(selectedFund?.fundId ? selectedFund?.contacts ?? [] : contacts).map((contact) => (
												<Contact
													handleDeleteClick={handleContactDelete}
													handleEditClick={handleContactEdit}
													key={contact.contactId ?? contact.tempId}
													primaryContact={contact.primary}
													contact={contact}
												/>
											))}
										</div>
										<OneColumnRow maxWidth='504px'>
											<FormTextAreaInput
												name='comments'
												label='Other comments (e.g., billing instructions)'
												rows={4}
												cols={50}
											/>
										</OneColumnRow>
										{(answers || fundsQuestions)?.map((question: IQuestion, ind: number) =>
											newQuestionRenderer(question, ind, values.answers ?? []),
										)}
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{fundId ? 'Save Fund' : '+ Create Fund'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditFund as default }
