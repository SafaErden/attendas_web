/* eslint-disable react/display-name */
import { memo, NamedExoticComponent } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { IForgotPasswordAction, LOGIN_ACTION_TYPES } from '../login.actions'
import { LoginProps } from '../login'
import { IGlobalState } from '../../../redux/reducers'
import { ILoginState } from '../login.reducer'
import { forgotPasswordValidationSchema, IForgotPasswordValues, initialValues } from './forgat-password-constants'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { FormInput } from '../../../shared/components/form-input'
import { Button } from '../../../shared/components/button'
import { Heading } from '../../../shared/components/heading'
import { Text } from '../../../shared/components/text'
import loginImage from '../../../images/login.png'
import logo from '../../../images/logo.png'
import { useMediaQuery } from '../../../hooks/use-media-query'

const ForgotPassword: NamedExoticComponent<LoginProps> = memo(() => {
	const dispatch = useDispatch()
	const { loading } = useSelector<IGlobalState, ILoginState>((state) => state.user)
	const { isDesktop } = useMediaQuery()

	const handleSubmit = (values: IForgotPasswordValues) => {
		dispatch(
			GenericActionCreator<IForgotPasswordAction>({
				type: LOGIN_ACTION_TYPES.FORGOT_PASSWORD,
				data: values?.email?.trim() ?? '',
			}),
		)
	}

	return (
		<Spin spinning={loading}>
			<div className='h-screen w-screen flex flex-col md:flex-row bg-grayBg'>
				<div
					className='w-full h-full hidden md:flex bg-primary-main px-12 flex-col justify-center'
					style={{ maxWidth: !isDesktop ? '100%' : '600px' }}
				>
					<img width='225px' src={logo} />
					<img style={{ marginLeft: '-100px', maxWidth: '740px' }} src={loginImage} />
					<Heading addedClasses='text-center' size='xl3' color='white'>
						CapZone Analytics Compliance Platform
					</Heading>
					<Text addedClasses='text-center mt-2' color='white' size='lg'>
						Facilitating the flow of capital to areas in need with confidence
					</Text>
				</div>

				<div className='w-screen h-screen md:min-h-full flex-col  flex items-center justify-center py-12 px-4 md:px-6 lg:px-8'>
					<div className='max-w-md w-full space-y-8 sm:p-10 rounded-lg relative'>
						<div className='flex flex-col gap-3 mb-10'>
							<Text weight='semiBold' size='xl2'>
								Reset your password
							</Text>
							<Text weight='light' size='sm'>
								Please enter the associated email with your account and you should receive the reset link in your email.
							</Text>
						</div>
						<Formik<IForgotPasswordValues>
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={forgotPasswordValidationSchema}
						>
							{() => {
								return (
									<Form>
										<input type='hidden' name='remember' value='true' />
										<div className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
											<FormInput
												name='email'
												label='Email Address'
												placeholder='Email Address'
												type='email'
												autoComplete='email'
												required
											/>

											<div>
												<Button type='submit' fullWidth>
													Send reset link
												</Button>
											</div>
										</div>
									</Form>
								)
							}}
						</Formik>
					</div>
				</div>
			</div>
		</Spin>
	)
})

export { ForgotPassword as default }
