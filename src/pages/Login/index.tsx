/* eslint-disable react/display-name */
import { LoginProps } from '../../pages/Login/login'
import { memo, NamedExoticComponent } from 'react'
import { Formik, Form } from 'formik'
import { ILoginValues, initialValues, loginValidationSchema } from './login.constants'
import { FormInput } from '../../shared/components/form-input'
import { useDispatch, useSelector } from 'react-redux'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { IGetLoginAction, LOGIN_ACTION_TYPES } from './login.actions'
import { IGlobalState } from '../../redux/reducers'
import { ILoginState } from './login.reducer'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { useMediaQuery } from '../../hooks/use-media-query'
import { Button } from '../../shared/components/button'
import { Text } from '../../shared/components/text'
import { Heading } from '../../shared/components/heading'
import logo from '../../images/logo.png'

const Login: NamedExoticComponent<LoginProps> = memo(() => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isDesktop } = useMediaQuery()
	const { isLoginFetching } = useSelector<IGlobalState, ILoginState>((state) => state.user)

	const handleSubmit = (values: ILoginValues) => {
		console.log('submittinggg')
		dispatch(
			GenericActionCreator<IGetLoginAction>({
				type: LOGIN_ACTION_TYPES.GET_LOGIN,
				data: values,
			}),
		)
	}

	const handlForgatClick = () => {
		navigate(MAIN_ROUTES.FORGOT_PASSWORD)
	}

	return (
		<Spin spinning={isLoginFetching}>
			<div className='h-screen w-screen flex flex-col md:flex-row bg-grayBg'>
				<div
					className='w-full h-full hidden md:flex bg-primary-main px-12 justify-center gap-6 flex-col items-center'
					style={{ maxWidth: !isDesktop ? '100%' : '600px' }}
				>
					<img width='225px' src={logo} />
					<Heading addedClasses='text-center' size='xl3' color='white'>
						Attendans Company Managing Platform
					</Heading>
					<Text addedClasses='text-center mt-2' color='white' size='lg'>
						Facilitating the flow of management work
					</Text>
				</div>

				<div className='w-screen h-screen md:min-h-full flex-col  flex items-center justify-center py-12 px-4 md:px-6 lg:px-8'>
					<div className='max-w-md w-full space-y-8 sm:p-10 rounded-lg relative'>
						<div className='flex flex-col mb-10'>
							<Text size='xl2'>Welcome to</Text>
							<Heading color='normal' size='xl4'>
								ATTENDANS
							</Heading>
						</div>
						<Formik<ILoginValues>
							initialValues={initialValues}
							onSubmit={handleSubmit}
							validationSchema={loginValidationSchema}
						>
							{() => {
								return (
									<Form>
										<input type='hidden' name='remember' value='true' />
										<div className='rounded-md shadow-sm -space-y-px flex flex-col gap-6'>
											<FormInput name='username' label='Username' placeholder='Usernames' type='text' />
											<FormInput
												name='password'
												label='Password'
												placeholder='Password'
												type='password'
												autoComplete='current-password'
											/>

											<div className='flex items-center justify-between gap-6'>
												<div className='flex items-center'>
													<input
														id='remember-me'
														name='remember-me'
														type='checkbox'
														className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
													/>
													<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
														Remember me
													</label>
												</div>

												<div onClick={handlForgatClick} className='text-sm'>
													<span className='font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer'>
														Forgot your password?
													</span>
												</div>
											</div>
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

export { Login as default }
