import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { navigation } from './home.constants'
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '../../redux/reducers'
import { GenericActionCreator } from '../../shared/action/generic.action'
import { ILogoutAction, LOGIN_ACTION_TYPES } from '../Login/login.actions'
import { Users } from '../Users/users.lazy'
import { CreateEditUser } from '../Users/create-edit-user/create-edit-user.lazy'
import { CreateEditFund } from '../Funds/create-edit-funds/create-edit-funds.lazy'
import { FundDetails } from '../Funds/fund-details/fund-details.lazy'
import { PageNotFound } from '../404'
import { Qozbs } from '../QOZBS/qozbs.lazy'
import { CreateEditQozb } from '../QOZBS/create-edit-qozb/create-edit-qozb.lazy'
import { QozbDetails } from '../QOZBS/qozb-details/qozb-details.lazy'
import { Investors } from '../Investors/investors.lazy'
import { CreateEditInvestor } from '../Investors/create-edit-investors/create-edit-investors.lazy'
import { InvestorDetails } from '../Investors/investor-details/fund-details.lazy'
import { Funds } from '../Funds/funds.lazy'
import { CapzoneIds } from '../CapzoneIds/capzoneIds.lazy'
import { CreateEditCapzoneId } from '../CapzoneIds/create-edit-capzone-id/create-edit-capzoneId.lazy'
import { CapzoneIdDetails } from '../CapzoneIds/capzone-id-details/capzoneId-details.lazy'
import { InvestorRelationShip } from '../CapzoneIds/investor-relationship/investor-relationship.lazy'
import { QOZBRelationShip } from '../CapzoneIds/qozb-relationship/qozb-relationship.lazy'
import logo from '../../images/logo.png'
import { ILoginState } from '../Login/login.reducer'
import { Text } from '../../shared/components/text'
import { IRoute } from './home'
import { menuPermissions } from '../../shared/contstants'
import { IGetContactRolesAction, USERS_ACTION_TYPES } from '../Users/users.actions'
import { CreateEditAsset } from '../QOZBS/assets/create-edit-asset/create-edit-asset.lazy'
import { Assets } from '../QOZBS/assets'
import { AssetDetail } from '../QOZBS/assets/asset-detail/asset-detail.lazy'
import { CreateAssetRelation } from '../QOZBS/assets/asset-detail/create-asset-relation'
import { MODAL_NAMES } from '../../shared/components/modal/modal.contsants'
import { Modal } from '../../shared/components/modal'
import DeleteConfirmation from '../../shared/components/delete-confirmation'

const userNavigation = [{ name: 'Sign out', href: '#' }]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const Home = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const dispatch = useDispatch()
	const { firstName = '', lastName = '', roleName } = useSelector<IGlobalState, ILoginState>((state) => state.user)
	const navigate = useNavigate()
	const location = useLocation()

	const handleItemClick = (route: string) => {
		navigate(route)
	}

	const handleUserNavClick = (item: { name: string }) => {
		if (item.name === 'Sign out') {
			dispatch(
				GenericActionCreator<ILogoutAction>({
					type: LOGIN_ACTION_TYPES.LOGOUT,
				}),
			)
		}
	}

	const permittedNavigations: IRoute[] = [
		...navigation.filter(
			(item) =>
				menuPermissions[roleName ?? 'empty']?.includes('all') ||
				menuPermissions[roleName ?? 'empty']?.includes(item.permissionName),
		),
	]

	useEffect(() => {
		dispatch(
			GenericActionCreator<IGetContactRolesAction>({
				type: USERS_ACTION_TYPES.GET_CONTACT_ROLES,
			}),
		)
	}, [])

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/funds')
		}
	}, [location.pathname])

	return (
		<>
			<div>
				<Modal stateName={MODAL_NAMES.DELETE_DATA} title='' maxWidth='512px'>
					<DeleteConfirmation />
				</Modal>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as='div' className='relative z-40 md:hidden' onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
						</Transition.Child>

						<div className='fixed inset-0 flex z-40'>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='-translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='-translate-x-full'
							>
								<Dialog.Panel className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-main'>
									<Transition.Child
										as={Fragment}
										enter='ease-in-out duration-300'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='ease-in-out duration-300'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div className='absolute top-0 right-0 -mr-12 pt-2'>
											<button
												type='button'
												className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
												onClick={() => setSidebarOpen(false)}
											>
												<span className='sr-only'>Close sidebar</span>
												<XIcon className='h-6 w-6 text-white' aria-hidden='true' />
											</button>
										</div>
									</Transition.Child>
									<div className='flex-shrink-0 flex items-center px-4'>
										<img
											className='h-8 w-auto'
											src='https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg'
											alt='Workflow'
										/>
									</div>
									<div className='mt-5 flex-1 h-0 overflow-y-auto'>
										<nav className='px-2 space-y-1'>
											{permittedNavigations.map((item) => (
												<span
													key={item.name}
													onClick={() => {
														if (!item.isDisabled) {
															handleItemClick(item.href)
														}
													}}
													className={classNames(
														location.pathname.includes(item.name.toLowerCase()) ||
															location.pathname.includes((item?.routeName ?? 'no route name').toLowerCase())
															? 'bg-black text-white'
															: `text-white ${item.isDisabled ? '' : 'hover:bg-zinc-800'}`,
														`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
															item.isDisabled ? '' : 'cursor-pointer'
														}`,
													)}
												>
													<item.icon className='mr-4 flex-shrink-0 h-6 w-6 text-indigo-300' aria-hidden='true' />
													{item.name}
												</span>
											))}
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div className='flex-shrink-0 w-14' aria-hidden='true'>
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex flex-col flex-grow pt-5 bg-primary-main overflow-y-auto'>
						<div className='flex items-center flex-shrink-0 px-4'>
							<img src={logo} width='122px' />
						</div>
						<div className='mt-5 flex-1 flex flex-col'>
							<nav className='flex-1 px-2 pb-4 space-y-1'>
								{permittedNavigations.map((item) => (
									<span
										key={item.name}
										onClick={() => {
											if (!item.isDisabled) {
												handleItemClick(item.href)
											}
										}}
										className={classNames(
											location.pathname.includes(item.name.toLowerCase()) ||
												location.pathname.includes((item?.routeName ?? 'no route name').toLowerCase())
												? 'bg-black text-white'
												: `text-white ${item.isDisabled ? '' : 'hover:bg-zinc-800'}`,
											`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
												item.isDisabled ? '' : 'cursor-pointer'
											}`,
										)}
									>
										<item.icon className='mr-3 flex-shrink-0 h-6 w-6 text-indigo-300' aria-hidden='true' />
										{item.name}
									</span>
								))}
							</nav>
						</div>
					</div>
				</div>
				<div className='md:pl-64 flex flex-col flex-1'>
					<div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
						<button
							type='button'
							className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
							onClick={() => setSidebarOpen(true)}
						>
							<span className='sr-only'>Open sidebar</span>
							<MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
						</button>
						<div className='flex-1 px-4 flex justify-end'>
							<div className='ml-4 flex items-center md:ml-6'>
								{/* Profile dropdown */}
								<Menu as='div' className='ml-auto relative'>
									<div>
										<Menu.Button className='max-w-xs bg-white flex gap-3 items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
											<span className='sr-only'>Open user menu</span>
											<img
												className='h-8 w-8 rounded-full'
												src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
												alt=''
											/>
											<div className='flex gap-1 items-center'>
												{firstName && (
													<Text color='lightGray'>
														{firstName} {lastName}
													</Text>
												)}
												<ChevronDownIcon className='w-3 h-3' />
											</div>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
											{userNavigation.map((item) => (
												<Menu.Item key={item.name}>
													{({ active }) => (
														<span
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700',
															)}
															onClick={() => handleUserNavClick(item)}
														>
															{item.name}
														</span>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<main className='bg-slate-100' style={{ minHeight: 'calc(100vh - 64px)' }}>
						<Routes>
							<Route path='funds' element={<Funds />} />
							<Route path='qozbs' element={<Qozbs />} />
							<Route path='users' element={<Users />} />
							<Route path='users/create-edit' element={<CreateEditUser />} />
							<Route path='users/create-edit/:userId' element={<CreateEditUser />} />
							<Route path='funds/create-edit' element={<CreateEditFund />} />
							<Route path='funds/create-edit/:fundId' element={<CreateEditFund />} />
							<Route path='funds/detail/:fundId' element={<FundDetails />} />
							<Route path='qozbs/create-edit/:qozbId' element={<CreateEditQozb />} />
							<Route path='qozbs/create-edit' element={<CreateEditQozb />} />
							<Route path='qozbs/detail/:qozbId' element={<QozbDetails />} />
							<Route path='investors' element={<Investors />} />
							<Route path='investors/create-edit' element={<CreateEditInvestor />} />
							<Route path='investors/create-edit/:investorId' element={<CreateEditInvestor />} />
							<Route path='investors/detail/:investorId' element={<InvestorDetails />} />
							<Route path='capzoneIds' element={<CapzoneIds />} />
							<Route path='capzoneIds/create-edit' element={<CreateEditCapzoneId />} />
							<Route path='capzoneIds/create-edit/:capzoneId' element={<CreateEditCapzoneId />} />
							<Route path='capzoneIds/detail/:capzoneId' element={<CapzoneIdDetails />} />
							<Route path='capzoneIds/detail/:capzoneId/investor-relationship' element={<InvestorRelationShip />} />
							<Route path='capzoneIds/detail/:capzoneId/qozb-relationship' element={<QOZBRelationShip />} />
							<Route path='qozbs/assets/create-edit/:qozbId' element={<CreateEditAsset />} />
							<Route path='qozbs/assets/create-edit/:qozbId/:assetId' element={<CreateEditAsset />} />
							<Route path='qozbs/assets/create-edit-relation/:assetId' element={<CreateAssetRelation />} />
							<Route path='qozbs/:qozbId/assets/detail/:assetId' element={<AssetDetail />} />
							<Route path='qozbs/assets/all' element={<Assets />} />

							<Route path='*' element={<PageNotFound />} />
						</Routes>

						{/* /End replace */}
					</main>
				</div>
			</div>
		</>
	)
}

export default Home
