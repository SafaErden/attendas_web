/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { initialValues, contactValidationSchema } from './create-edit-contact.constants'
import { FormInput } from '../../../shared/components/form-input'
import { FormSelectInput } from '../../../shared/components/form-select-input'
import { IGlobalState } from '../../../redux/reducers'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { TwoColumnRow } from '../../../shared/components/two-colum-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { FormPhoneInput } from '../../../shared/components/form-phone-input'
import { IContact, ICreateEditContactProps } from '../../Funds/funds'
import {
	IPutQozbContacstAction,
	ISetQozbContactsAction,
	ISetSelectedContactAction,
	QOZBS_ACTION_TYPES,
} from '../qozbs.actions'
import { toggleModalVisibility } from '../../../shared/components/modal/modal.actions'
import { MODAL_NAMES } from '../../../shared/components/modal/modal.contsants'
import { IQozbsState } from '../qozb.reducer'
import { IUsersState } from '@src/pages/Users/users.reducer'

export const CreateEditContact: NamedExoticComponent<ICreateEditContactProps> = memo(() => {
	const dispatch = useDispatch()

	const { selectedContact, contacts, selectedQozb } = useSelector<IGlobalState, IQozbsState>((state) => state.qozbs)

	const { contactRoles } = useSelector<IGlobalState, IUsersState>((state) => state.users)

	const contactRolesWithEmptyState = [{ contactRoleId: '', contactRoleName: 'Select Role' }, ...contactRoles]

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSelectedContactAction>({
					type: QOZBS_ACTION_TYPES.SET_SELECTED_CONTACT,
					data: null,
				}),
			)
		}
	}, [])

	const handleSubmit = (values: Partial<IContact>) => {
		if (selectedQozb?.businessId) {
			const selectedContactIndex = selectedQozb?.contacts?.findIndex(
				(c) => (c.contactId ?? c.tempId) === (selectedContact?.contactId ?? selectedContact?.tempId),
			)
			let newContacts = [...(selectedQozb?.contacts || [])]
			if ((selectedContactIndex as number) >= 0) {
				newContacts[selectedContactIndex as number] = {
					contactId: newContacts[selectedContactIndex as number].contactId,
					contactRole: newContacts[selectedContactIndex as number].contactRole,
					contactRoleId: newContacts[selectedContactIndex as number].contactRoleId,
					tempId: newContacts[selectedContactIndex as number].tempId,
					...values,
				}
			} else {
				newContacts = [...newContacts, values]
			}
			dispatch(
				GenericActionCreator<IPutQozbContacstAction>({
					type: QOZBS_ACTION_TYPES.PUT_QOZB_CONTACTS,
					data: {
						businessId: selectedQozb?.businessId,
						contacts: newContacts.map((c) => ({
							...c,
							contactRoleId: c.contactRoleId || c.contactRole?.contactRoleId,
							tempId: undefined,
							contactRole: undefined,
							email: c.email ? c.email : null,
							phone: c.phone ? c.phone : null,
						})),
					},
				}),
			)
		} else {
			const role = contactRoles.find((c) => c.contactRoleId === values.contactRoleId)
			const selectedContactIndex = contacts?.findIndex((c) => c.tempId === selectedContact?.tempId)
			let newContacts = [...contacts]
			if (selectedContactIndex >= 0) {
				newContacts[selectedContactIndex] = {
					...values,
					tempId: `newContact-${contacts.length + 1}`,
					contactRole: {
						contactRoleId: role?.contactRoleId as number,
						contactRoleName: role?.contactRoleName as string,
					},
				}
			} else {
				newContacts = [
					...contacts,
					{
						...values,
						tempId: `newContact-${contacts.length + 1}`,
						contactRole: {
							contactRoleId: role?.contactRoleId as number,
							contactRoleName: role?.contactRoleName as string,
						},
					},
				]
			}

			dispatch(
				GenericActionCreator<ISetQozbContactsAction>({
					type: QOZBS_ACTION_TYPES.SET_QOZB_CONTACTS,
					data: newContacts,
				}),
			)

			dispatch(toggleModalVisibility(MODAL_NAMES.QOZB_CONTACT))
		}
	}

	return (
		<Formik<Partial<IContact>>
			initialValues={initialValues(selectedContact)}
			enableReinitialize
			onSubmit={handleSubmit}
			validationSchema={contactValidationSchema}
		>
			{() => {
				return (
					<Form>
						<div className='w-full space-y-8 bg-white'>
							<div className='flex mt-10 flex-col gap-6'>
								<TwoColumnRow>
									<FormInput name='firstName' label='First Name' placeholder='First Name' type='text' />
									<FormInput name='lastName' label='Last Name' placeholder='Last Name' type='text' />
								</TwoColumnRow>
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
								<OneColumnRow maxWidth='240px'>
									<FormSelectInput
										name='contactRoleId'
										label='Role'
										options={contactRolesWithEmptyState.map((r) => ({ id: r.contactRoleId, name: r.contactRoleName }))}
									/>
								</OneColumnRow>
							</div>
						</div>
						<div className='mt-5'>
							<Button type='submit'>
								{selectedContact?.contactId ?? selectedContact?.tempId ? 'Edit Contact' : '+ Add Contact'}
							</Button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
})

export { CreateEditContact as default }
