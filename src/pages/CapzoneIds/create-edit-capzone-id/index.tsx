/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
// import { PlusSmIcon } from '@heroicons/react/solid'

import { memo, NamedExoticComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Formik } from 'formik'
import { initialValues, capzoneIdValidatioSchema } from './create-edit-capzoneId.constants'
import { IGlobalState } from '../../../redux/reducers'
import PageLayout from '../../../shared/components/page-layout'
import { useParams } from 'react-router-dom'
import { OneColumnRow } from '../../../shared/components/one-column-row'
import { Button } from '../../../shared/components/button'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { Spin } from 'antd'
import { ICapzoneIdsState } from '../capzoneIds.reducer'
import {
	CAPZONEIDS_ACTION_TYPES,
	ICreateCapzoneIdAction,
	IEditCapzoneIdAction,
	IGetAllFundsAction,
	IGetAllInvestorsAction,
	IGetAllQozbsAction,
	IGetAllUsersAction,
	IGetSingleCapzoneIdsAction,
	ISetSingleCapzoneIdAction,
} from '../capzoneIds.actions'
import { ICapzoneId } from '../capzoneIds'
import { FormSearchableSelectInput } from '../../../shared/components/form-select-searchable'

const CreateEditCapzoneId: NamedExoticComponent = memo(() => {
	const dispatch = useDispatch()
	const { capzoneId } = useParams()

	const { loading, selectedCapzoneId, allFunds, allQozbs, allInvestors, allUsers } = useSelector<
		IGlobalState,
		ICapzoneIdsState
	>((state) => state.capzoneIds)

	useEffect(() => {
		if (capzoneId) {
			dispatch(
				GenericActionCreator<IGetSingleCapzoneIdsAction>({
					type: CAPZONEIDS_ACTION_TYPES.GET_CAPZONEID,
					data: capzoneId,
				}),
			)
		}
	}, [capzoneId])

	useEffect(() => {
		return () => {
			dispatch(
				GenericActionCreator<ISetSingleCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.SET_CAPZONEID,
					data: null,
				}),
			)
		}
	}, [])

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetAllQozbsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_QOZBS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllFundsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_FUNDS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllInvestorsAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_INVESTORS,
			}),
		)
		dispatch(
			GenericActionCreator<IGetAllUsersAction>({
				type: CAPZONEIDS_ACTION_TYPES.GET_ALL_USERS,
			}),
		)
	}, [])

	const handleSubmit = (values: Partial<ICapzoneId>) => {
		if (capzoneId) {
			dispatch(
				GenericActionCreator<IEditCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.EDIT_CAPZONEID,
					data: {
						...values,
					},
				}),
			)
		} else {
			dispatch(
				GenericActionCreator<ICreateCapzoneIdAction>({
					type: CAPZONEIDS_ACTION_TYPES.CREATE_CAPZONEID,
					data: {
						...values,
					},
				}),
			)
		}
	}

	const fundOptions = allFunds.map((f) => ({
		id: f.fundId,
		name: f.fundName,
	}))

	const investorOptions = allInvestors.map((i) => ({
		id: i.investorId,
		name: i.company ? `${i.companyName}` : `${i.firstName} ${i.lastName}`,
	}))

	const qozbOptions = allQozbs.map((q) => ({
		id: q.businessId as string,
		name: q.businessName,
	}))

	const userOptions = allUsers.map((u) => ({ id: `${u.userId}`, name: `${u.firstName} ${u.lastName}` }))

	return (
		<Spin spinning={loading}>
			<PageLayout showButton={false} name={`${capzoneId ? 'Edit the' : 'Create a'} CapZone ID`}>
				<Formik<Partial<ICapzoneId>>
					initialValues={initialValues(selectedCapzoneId)}
					enableReinitialize
					onSubmit={handleSubmit}
					validationSchema={capzoneIdValidatioSchema}
				>
					{() => {
						return (
							<Form>
								<div className='w-full space-y-8 bg-white p-3 sm:p-10 rounded-lg relative'>
									<div style={{ maxWidth: '504px' }} className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
										<OneColumnRow>
											<FormSearchableSelectInput
												placeholder='search fund...'
												name='fundId'
												label='Select Fund'
												options={fundOptions}
											/>
										</OneColumnRow>
										<OneColumnRow>
											<FormSearchableSelectInput
												placeholder='search investor...'
												name='investorId'
												label='Link Fund to Investor'
												options={investorOptions}
											/>
										</OneColumnRow>
										<OneColumnRow>
											<FormSearchableSelectInput
												placeholder='search QOZB...'
												name='businessId'
												label='Link Fund to QOZB'
												options={qozbOptions}
											/>
										</OneColumnRow>
										<OneColumnRow>
											<FormSearchableSelectInput
												placeholder='search user...'
												name='assignedTo'
												label='Assign CapZone ID'
												options={userOptions}
											/>
										</OneColumnRow>
									</div>
								</div>
								<div className='mt-5'>
									<Button type='submit'>{capzoneId ? 'Save CapZone ID' : '+ Create CapZone ID'}</Button>
								</div>
							</Form>
						)
					}}
				</Formik>
			</PageLayout>
		</Spin>
	)
})

export { CreateEditCapzoneId as default }
