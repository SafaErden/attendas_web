/* eslint-disable react/display-name */
import { memo, NamedExoticComponent, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { IVerifyEmailData, LoginProps } from '../login'
import { verifyEmailInitialValues, verifyEmailValidationSchema } from './verify-email.constants'
import { IGlobalState } from '../../../redux/reducers'
import { ILoginState } from '../login.reducer'
import { GenericActionCreator } from '../../../shared/action/generic.action'
import { IVerifayEmailAction, LOGIN_ACTION_TYPES } from '../login.actions'
import { FormInput } from '../../../shared/components/form-input'
import { MAIN_ROUTES } from '../../../shared/route.enums'
import { Button } from '../../../shared/components/button'
import { Heading } from '../../../shared/components/heading'
import { Text } from '../../../shared/components/text'
import loginImage from '../../../images/login.png'
import logo from '../../../images/logo.png'
import { useMediaQuery } from '../../../hooks/use-media-query'

const VerifyEmail: NamedExoticComponent<LoginProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { isDesktop } = useMediaQuery()

	const token = location.search.split('=')?.[1]
	const { loading } = useSelector<IGlobalState, ILoginState>((state) => state.user)

	const handleSubmit = (values: IVerifyEmailData) => {
		dispatch(
			GenericActionCreator<IVerifayEmailAction>({
				type: LOGIN_ACTION_TYPES.VERIFY_EMAIL,
				data: { ...values, verificationToken: token },
			}),
		)
	}

	useEffect(() => {
		if (!token) {
			navigate(MAIN_ROUTES.LOGIN)
		}
	}, [])

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
						<div className='flex flex-col mb-10'>
							<Text size='xl2'>Welcome to</Text>
							<Heading color='normal' size='xl4'>
								CapZone Analytics
							</Heading>
							<Text addedClasses='mt-3' weight='light'>
								Please verify your email and set credentials for your next login attempt
							</Text>
						</div>

						<Formik<IVerifyEmailData>
							initialValues={verifyEmailInitialValues}
							onSubmit={handleSubmit}
							validationSchema={verifyEmailValidationSchema}
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
											<FormInput
												name='password'
												label='Password'
												placeholder='Password'
												type='password'
												autoComplete='current-password'
												required
											/>

											<FormInput
												name='confirmPassword'
												label='Confirm Password'
												placeholder='Password'
												type='password'
												required
											/>

											<div>
												<Button type='submit' fullWidth>
													Sign in
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

export { VerifyEmail as default }
