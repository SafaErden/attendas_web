/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { qozbValidatioSchema, initialValues } from './create-edit-qozb.constants'
import { FormInput } from '../../../shared/components/form-input'
import { IQOZB, QozbProps } from '../qozbs'
import { IGlobalState } from '../../../redux/reducers'
import { IQozbsState } from '../qozb.reducer'
import PageLayout from '../../../shared/components/page-layout'
import { useParams } from 'react-router-dom'
import { TwoColumnRow } from '../../../shared/components/two-colum-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import {
	ICreateQozbAction,
	IDeleteQozbContactAction,
	IEditQozbAction,
	IGetQozbsQuestionsAction,
	IGetPropertyOwnersAction,
	IGetQozbEntityTypesAction,
	IGetQozbLocationsAction,
	IGetQozbTypesAction,
	IGetSingleQozbsAction,
	ISetQozbContactsAction,
	ISetSelectedContactAction,
	ISetSingleQozbAction,
	QOZBS_ACTION_TYPES,
} from '../qozbs.actions'
import { FormPhoneInput } from '../../../shared/components/form-phone-input'
import { formatPhone } from '../../../utils/format-phone'
import { Spin } from 'antd'
import { Modal } from '../../../shared/components/modal'
import { MODAL_NAMES } from '../../../shared/components/modal/modal.contsants'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { RadioGroupWithBorder } from '../../../shared/components/radio-group-with-border'
import { FormSelectInput } from '../../../shared/components/form-select-input'
import { toggleModalVisibility } from '../../../shared/components/modal/modal.actions'
import { Contact } from '../../../pages/Funds/contact'
import CreateEditContact from '../create-edit-contact'
import { IContact } from '../../../pages/Funds/funds'
import { newQuestionRenderer } from '../../../pages/CapzoneIds/question-renderer'
import { IQuestion } from '../../../pages/CapzoneIds/capzoneIds'
import { newRelationSubmitHandler } from '../../../pages/CapzoneIds/relation-submit-handler'

const CreateEditQozb: NamedExoticComponent<QozbProps> = memo(() => {
	const dispatch = useDispatch()
	const { qozbId } = useParams()

	const { selectedQozb, loading, locations, qozbTypes, contacts, qozbsQuestions } = useSelector<
		IGlobalState,
		IQozbsState
	>((state) => state.qozbs)

	const locationsWithEmptyState = [{ state: '', stateName: 'Select State', qozbsCount: 0 }, ...locations]
	const answers = selectedQozb?.answers
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
		dispatch(
			GenericActionCreator<IGetQozbLocationsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_LOCATIONS,
			}),
		)

		dispatch(
			GenericActionCreator<IGetQozbTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_TYPES,
			}),
		)

		/**
		 * @Emre TODO we don need to fetch these here
		 */
		dispatch(
			GenericActionCreator<IGetQozbEntityTypesAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZB_ENTITY_TYPES,
			}),
		)

		dispatch(
			GenericActionCreator<IGetPropertyOwnersAction>({
				type: QOZBS_ACTION_TYPES.GET_PROPERTY_OWNERS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetQozbsQuestionsAction>({
				type: QOZBS_ACTION_TYPES.GET_QOZBS_QUESTIONS,
			}),
		)
	}, [])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleQozbAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB,
					data: null,
				}),
			)

			dispatch(
				GenericActionCreator<ISetQozbContactsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_CONTACTS,
					data: [],
				}),
			)
		}
	}, [])

	const handleSubmit = (values: Partial<IQOZB>) => {
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
		const phoneNumber = formatPhone(values.phone as string)
		if (qozbId) {
			const formData = {
				...formValues,
				contacts: selectedQozb?.contacts?.map((c) => ({
					...c,
					contactRoleId: c.contactRole?.contactRoleId,
					contactRole: undefined,
				})),
				answers: newRelationSubmitHandler(formValues.answers),
			}
			if (phoneNumber !== '') {
				formData.phone = phoneNumber
			}
			dispatch(
				GenericActionCreator<IEditQozbAction>({
					type: QOZBS_ACTION_TYPES.EDIT_QOZB,
					data: formData,
				}),
			)
		} else {
			const formData = {
				...formValues,
				contacts: contacts.map((c) => ({ ...c, tempId: undefined, contactRole: undefined })),
				answers: newRelationSubmitHandler(formValues.answers),
			}
			if (phoneNumber !== '') {
				formData.phone = phoneNumber
			}
			dispatch(
				GenericActionCreator<ICreateQozbAction>({
					type: QOZBS_ACTION_TYPES.CREATE_QOZB,
					data: formData,
				}),
			)
		}
	}

	const handleContactEdit = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<ISetSelectedContactAction>({
				type: QOZBS_ACTION_TYPES.SET_SELECTED_CONTACT,
				data: contact,
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.QOZB_CONTACT))
	}

	const handleContactDelete = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<IDeleteQozbContactAction>({
				type: QOZBS_ACTION_TYPES.DELETE_QOZB_CONTACT,
				data: {
					businessId: selectedQozb && contact.contactId ? selectedQozb.businessId : undefined,
					contactId: (contact.contactId ?? contact.tempId) as string,
				},
			}),
		)
	}
	const onLinkClick = () => dispatch(toggleModalVisibility(MODAL_NAMES.QOZB_LOCATION))

	return (
		<Spin spinning={loading}>
			<PageLayout showButton={false} name={`${qozbId ? 'Edit the' : 'Create a'} QOZB`}>
				<Formik<Partial<IQOZB>>
					initialValues={initialValues(selectedQozb, locationsWithEmptyState, qozbTypes, answers || qozbsQuestions)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={qozbValidatioSchema}
				>
					{({ values }) => {
						return (
							<Form>
								<Modal
									stateName={MODAL_NAMES.QOZB_CONTACT}
									title={selectedQozb?.businessId ? 'Edit Contact' : 'Add a Contact'}
								>
									<CreateEditContact />
								</Modal>
								<Modal maxWidth='1400px' stateName={MODAL_NAMES.QOZB_LOCATION} title=''>
									<iframe
										src='https://hudgis-hud.opendata.arcgis.com/datasets/ef143299845841f8abb95969c01f88b5_0/explore'
										className='w-full p-5'
										style={{ height: '85vh' }}
									/>
								</Modal>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<div style={{ maxWidth: '504px' }} className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
										<OneColumnRow maxWidth='504px'>
											<RadioGroupWithBorder
												name='businessTypeId'
												label='Business Type'
												options={qozbTypes.map((q) => ({
													id: q.businessTypeId,
													name: q.businessTypeName,
													description: q.businessTypeDescription,
												}))}
											/>
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='businessName' label="QOZB's Name" placeholder="QOZB's Name" type='text' />
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput
												name='doingBusinessAs'
												label='Doing business as'
												placeholder='Doing business as'
												type='text'
											/>
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='taxId' label="QOZB's EIN" placeholder='98-7251892' type='text' />
										</OneColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput
												name='censusTract'
												label='Census Tract (where the QOZB property is located)'
												placeholder='Enter...'
												type='text'
											/>
										</OneColumnRow>
										<TwoColumnRow>
											<FormInput
												name='email'
												label='Email Address'
												placeholder='Email Address'
												type='email'
												autoComplete='email'
											/>
											<FormPhoneInput name='phone' label='Phone Number' placeholder='(202) 555-0179' />
										</TwoColumnRow>
										<OneColumnRow maxWidth='504px'>
											<FormInput name='country' label='Country' placeholder='USA...' type='text' />
										</OneColumnRow>

										<OneColumnRow maxWidth='504px'>
											<FormInput
												name='street'
												label="QOZB's Street Address"
												placeholder='e.g. Country Road 151'
												type='text'
											/>
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
												onClick={() => dispatch(toggleModalVisibility(MODAL_NAMES.QOZB_CONTACT))}
												className='cursor-pointer text-blue-800'
											>
												+ New Contact
											</span>
										</div>
										<div className='flex flex-col gap-3'>
											{(selectedQozb?.businessId ? selectedQozb?.contacts ?? [] : contacts).map((contact) => (
												<Contact
													handleDeleteClick={handleContactDelete}
													handleEditClick={handleContactEdit}
													key={contact.contactId ?? contact.tempId}
													contact={contact}
												/>
											))}
										</div>
										{/* <OneColumnRow maxWidth='504px'>
											<RadioGroup
												LinkComp={
													<span
														onClick={() => dispatch(toggleModalVisibility(MODAL_NAMES.QOZB_LOCATION))}
														className='cursor-pointer text-blue-800'
													>
														Click here to check the QOZB&apos;s location
													</span>
												}
												options={[
													{
														id: '1',
														name: 'Yes',
													},
													{
														id: '0',
														name: 'No',
													},
												]}
												name='ozLocated'
												label='Is the QOZB located in an opportunity zone? (Derived from the address)'
											/>
										</OneColumnRow> */}
										{(answers || qozbsQuestions)?.map((question: IQuestion, ind: number) =>
											newQuestionRenderer(question, ind, values.answers ?? [], '', 0, onLinkClick),
										)}
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{qozbId ? 'Save QOZB' : '+ Create QOZB'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditQozb as default }
