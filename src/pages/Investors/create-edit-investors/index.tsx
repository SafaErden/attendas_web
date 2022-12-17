/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { initialValues, investorValidatioSchema } from './create-edit-investors.constants'
import { FormInput } from '../../../shared/components/form-input'
import { FormSelectInput } from '../../../shared/components/form-select-input'
import { IGlobalState } from '../../../redux/reducers'
import PageLayout from '../../../shared/components/page-layout'
import { useParams } from 'react-router-dom'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { TwoColumnRow } from '../../../shared/components/two-colum-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { FormPhoneInput } from '../../../shared/components/form-phone-input'
import { formatPhone } from '../../../utils/format-phone'
import { Spin } from 'antd'
import { IInvestorsState } from '../investors.reducer'
import {
	INVESTORS_ACTION_TYPES,
	ICreateInvestorAction,
	IDeleteInvestorContactAction,
	IEditInvestorAction,
	IGetInvestorLocationsAction,
	IGetSingleInvestorsAction,
	ISetSelectedContactAction,
	ISetSingleInvestorAction,
	ISetContactsAction,
} from '../investors.actions'
import { IInvestor } from '../investors'
import { MODAL_NAMES } from '../../../shared/components/modal/modal.contsants'
import { toggleModalVisibility } from '../../../shared/components/modal/modal.actions'
import { Modal } from '../../../shared/components/modal'
import CreateEditContact from '../create-edit-contact'
import { Contact } from '../../../pages/Funds/contact'
import { IContact } from '../../../pages/Funds/funds'
import { CheckboxField } from '../../../shared/components/checkbox-field'

const CreateEditInvestor: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { investorId } = useParams()

	const { locations, loading, selectedInvestor, contacts, selectedContact } = useSelector<
		IGlobalState,
		IInvestorsState
	>((state) => state.investors)

	const locationsWithEmptyState = [{ state: '', stateName: 'Select State' }, ...locations]

	useEffect(() => {
		if (investorId) {
			dispatch(
				GenericActionCreator<IGetSingleInvestorsAction>({
					type: INVESTORS_ACTION_TYPES.GET_INVESTOR,
					data: investorId,
				}),
			)
		}
	}, [investorId])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleInvestorAction>({
					type: INVESTORS_ACTION_TYPES.SET_INVESTOR,
					data: null,
				}),
			)

			dispatch(
				GenericActionCreator<ISetContactsAction>({
					type: INVESTORS_ACTION_TYPES.SET_CONTACTS,
					data: [],
				}),
			)
		}
	}, [])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetInvestorLocationsAction>({
				type: INVESTORS_ACTION_TYPES.GET_LOCATIONS,
			}),
		)
	}, [])

	const handleSubmit = (values: Partial<IInvestor>) => {
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
		if (investorId) {
			const formData = {
				...formValues,
				contacts: selectedInvestor?.contacts?.map((c) => ({
					...c,
					contactRoleId: c.contactRole?.contactRoleId,
					contactRole: undefined,
				})),
			}
			if (phoneNumber !== '') {
				formData.phone = phoneNumber
			}
			dispatch(
				GenericActionCreator<IEditInvestorAction>({
					type: INVESTORS_ACTION_TYPES.EDIT_INVESTOR,
					data: formData,
				}),
			)
		} else {
			const formData = {
				...formValues,
				contacts: contacts.map((c) => ({ ...c, tempId: undefined, contactRole: undefined })),
			}
			if (phoneNumber !== '') {
				formData.phone = phoneNumber
			}
			dispatch(
				GenericActionCreator<ICreateInvestorAction>({
					type: INVESTORS_ACTION_TYPES.CREATE_INVESTOR,
					data: formData,
				}),
			)
		}
	}

	const handleContactEdit = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<ISetSelectedContactAction>({
				type: INVESTORS_ACTION_TYPES.SET_SELECTED_CONTACT,
				data: contact,
			}),
		)
		dispatch(toggleModalVisibility(MODAL_NAMES.CONTACT))
	}

	const handleContactDelete = (contact: Partial<IContact>) => {
		dispatch(
			GenericActionCreator<IDeleteInvestorContactAction>({
				type: INVESTORS_ACTION_TYPES.DELETE_INVESTOR_CONTACT,
				data: {
					investorId: selectedInvestor && contact.contactId ? selectedInvestor.investorId : undefined,
					contactId: (contact.contactId ?? contact.tempId) as string,
				},
			}),
		)
	}

	return (
		<Spin spinning={loading}>
			<PageLayout showButton={false} name={`${investorId ? 'Edit the' : 'Add an'} Investor`}>
				<Formik<Partial<IInvestor>>
					initialValues={initialValues(selectedInvestor, locationsWithEmptyState)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={investorValidatioSchema}
				>
					{(values) => {
						return (
							<Form>
								<Modal
									stateName={MODAL_NAMES.CONTACT}
									title={selectedContact?.contactId ? 'Edit Contact' : 'Add a Contact'}
								>
									<CreateEditContact />
								</Modal>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<div style={{ maxWidth: '504px' }} className='rounded-md -space-y-px flex flex-col gap-6'>
										<div>
											<h3 className='font-semibold text-lg'>Investor&apos;s Information</h3>
											<span className='block'>Please enter the investor&apos;s mailing address.</span>
										</div>
										<OneColumnRow>
											<CheckboxField name='company' desc='Company' />
										</OneColumnRow>
										{values.values.company ? (
											<OneColumnRow>
												<FormInput
													name='companyName'
													label='Company Name'
													placeholder="Investor's Company Name..."
													type='text'
												/>
											</OneColumnRow>
										) : (
											<TwoColumnRow>
												<FormInput
													name='firstName'
													label='First Name'
													placeholder="Investor's First Name..."
													type='text'
												/>
												<FormInput
													name='lastName'
													label='Last Name'
													placeholder="Investor's Last Name..."
													type='text'
												/>
											</TwoColumnRow>
										)}

										<TwoColumnRow>
											<FormInput
												name='email'
												label='Email Address'
												placeholder="Investor's Email Address..."
												type='email'
												autoComplete='email'
											/>
											<FormPhoneInput name='phone' label='Phone Number' placeholder="Investor's Phone Number..." />
										</TwoColumnRow>
										<TwoColumnRow maxWidth='504px'>
											<FormInput name='country' label='Country / Region' placeholder='USA...' type='text' />
											<FormInput name='city' label='City' placeholder='Seatle...' type='text' />
										</TwoColumnRow>

										<OneColumnRow maxWidth='504px'>
											<FormInput name='street' label='Street Address' placeholder='e.g. Country Road 151' type='text' />
										</OneColumnRow>
										<TwoColumnRow>
											<FormSelectInput
												name='state'
												label='State'
												options={locationsWithEmptyState.map((l) => ({ id: l.state, name: l.stateName }))}
											/>
											<FormInput name='zipCode' label='ZIP Code / Postal Code' placeholder='12789' type='text' />
										</TwoColumnRow>
										<div style={{ maxWidth: '504px' }} className='mb-2 flex align-center justify-between'>
											<span className='text-gray-900 font-medium'>Related contacts / Advisors</span>
											<span
												onClick={() => dispatch(toggleModalVisibility(MODAL_NAMES.CONTACT))}
												className='cursor-pointer text-blue-800'
											>
												+ Add Contact
											</span>
										</div>
										<div className='flex flex-col gap-3'>
											{(selectedInvestor?.investorId ? selectedInvestor?.contacts ?? [] : contacts).map((contact) => (
												<Contact
													handleDeleteClick={handleContactDelete}
													handleEditClick={handleContactEdit}
													key={contact.contactId ?? contact.tempId}
													contact={contact}
												/>
											))}
										</div>
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{investorId ? 'Save Investor' : '+ Add Investor'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditInvestor as default }
