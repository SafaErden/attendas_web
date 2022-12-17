import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ReactNode } from 'react'

interface ICollapsePropse {
	HidedContent?: ReactNode
	ShowedContent: ReactNode
}

export const CollapseWrapper = ({ HidedContent, ShowedContent }: ICollapsePropse) => {
	return (
		<Disclosure
			as={'div'}
			className='bg-white flex flex-col gap-10 rounded-lg mt-5 px-5 pt-5 pb-3 shadow-xl transform transition-all w-full'
		>
			{({ open }) => {
				return (
					<>
						{ShowedContent}
						{!!HidedContent && (
							<Transition
								enter='transition duration-100 ease-out'
								enterFrom='transform scale-95 opacity-0'
								enterTo='transform scale-100 opacity-100'
								leave='transition duration-75 ease-out'
								leaveFrom='transform scale-100 opacity-100'
								leaveTo='transform scale-95 opacity-0'
							>
								<Disclosure.Panel>{HidedContent}</Disclosure.Panel>
							</Transition>
						)}

						{!!HidedContent && (
							<Disclosure.Button className='flex w-full items-center justify-center gap-1 cursor-pointer mt-2'>
								<span className='text-indigo-500 font-medium'>{open ? 'Show less details' : 'Show more details'}</span>
								<ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-indigo-500`} />
							</Disclosure.Button>
						)}
					</>
				)
			}}
		</Disclosure>
	)
}
