/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { userValidatioSchema, initialValues } from './create-edit-user.constants'
import { FormInput } from '../../../shared/components/form-input'
import { FormSelectInput } from '../../../shared/components/form-select-input'
import { IUser, UserProps } from '../users'
import { IGlobalState } from '../../../redux/reducers'
import { IUsersState } from '../users.reducer'
import PageLayout from '../../../shared/components/page-layout'
import { useParams } from 'react-router-dom'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { TwoColumnRow } from '../../../shared/components/two-colum-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import {
	ICreateUserAction,
	IEditUserAction,
	IGetSingleUsersAction,
	ISetSingleUserAction,
	USERS_ACTION_TYPES,
} from '../users.actions'
import { FormPhoneInput } from '../../../shared/components/form-phone-input'
import { formatPhone } from '../../../utils/format-phone'
import { Spin } from 'antd'

const CreateEditUser: NamedExoticComponent<UserProps> = memo(() => {
	const dispatch = useDispatch()
	const { userId } = useParams()

	const { roles, selectedUser, loading } = useSelector<IGlobalState, IUsersState>((state) => state.users)

	useEffect(() => {
		if (userId) {
			dispatch(
				GenericActionCreator<IGetSingleUsersAction>({
					type: USERS_ACTION_TYPES.GET_USER,
					data: userId,
				}),
			)
		}
	}, [userId])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleUserAction>({
					type: USERS_ACTION_TYPES.SET_USER,
					data: null,
				}),
			)
		}
	}, [])

	const handleSubmit = (values: Partial<IUser>) => {
		const phoneNumber = formatPhone(values.phone as string)
		if (userId) {
			dispatch(
				GenericActionCreator<IEditUserAction>({
					type: USERS_ACTION_TYPES.EDIT_USER,
					data: {
						...values,
						phone: phoneNumber,
					},
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<ICreateUserAction>({
					type: USERS_ACTION_TYPES.CREATE_USER,
					data: { ...values, phone: phoneNumber },
				}),
			)
		}
	}

	return (
		<Spin spinning={loading}>
			<PageLayout showButton={false} name={`${userId ? 'Edit the' : 'Create a'} User`}>
				<Formik<Partial<IUser>>
					initialValues={initialValues(selectedUser)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={userValidatioSchema}
				>
					{() => {
						return (
							<Form>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<h3 className='font-semibold'>Personal Information</h3>
									<span className='block'>
										Complete the forms with the personal information as well as the assigned role.
									</span>

									<div className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
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
										<OneColumnRow maxWidth='488px'>
											<FormSelectInput
												name='roleId'
												label='Role'
												options={roles.map((r) => ({ id: r.roleId, name: r.roleDescription }))}
											/>
										</OneColumnRow>
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{userId ? 'Save User' : '+ Create User'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditUser as default }
