/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Fragment, ReactNode, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toggleModalVisibility } from './modal.actions'
import { useSelector, useDispatch } from 'react-redux'
import { IGlobalState } from '@src/redux/reducers'
import { XIcon } from '@heroicons/react/outline'

interface IModalProps {
	children: ReactNode
	minWidth?: string
	title?: string
	maxWidth?: string
	stateName: string
}
export const Modal = ({ stateName, children, title, maxWidth = '600px' }: IModalProps) => {
	const dispatch = useDispatch()
	const isOpen = useSelector((state: IGlobalState) => state.modal[stateName])
	const focusRef = useRef(null)

	return (
		<Transition.Root show={isOpen} as='div'>
			{/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
			<Dialog initialFocus={focusRef} as='div' className='relative z-50' onClose={() => {}}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed z-50 inset-0 overflow-y-auto'>
					<div className='flex items-center justify-center min-h-full p-4 text-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel
								style={{ maxWidth }}
								className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6 w-full'
							>
								<Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
									<div className='flex'>
										{title}
										<div
											ref={focusRef}
											className='absolute right-5 top-5 cursor-pointer'
											onClick={() => dispatch(toggleModalVisibility(stateName))}
										>
											<XIcon className='h-5 w-5 text-gray-500' />
										</div>
									</div>
								</Dialog.Title>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
