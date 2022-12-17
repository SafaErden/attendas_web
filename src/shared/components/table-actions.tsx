/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import './table.actions.css'
import { useSelector } from 'react-redux'
import { IGlobalState } from '@src/redux/reducers'

export const Actions = () => {
	return (
		<div className='w-12 h-12 cursor-pointer flex items-center justify-center'>
			<div className='tableActions' />
		</div>
	)
}

interface ITableActionsProps {
	children: React.ReactNode
}

export const TableActions = ({ children }: ITableActionsProps) => {
	const [referenceElement, setReferenceElement] = useState<any>()
	const [popperElement, setPopperElement] = useState<any>()
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-start' })
	const isModalOn = useSelector((state: IGlobalState) => state.modal.deleteData)

	return (
		<Popover>
			<>
				<Popover.Button ref={setReferenceElement}>
					<Actions />
				</Popover.Button>
				{!isModalOn && (
					<Popover.Panel
						className='flex flex-col mr-2 p-2 z-50 shadow-md bg-white items-center justify-center gap-3 border rounded-md'
						ref={setPopperElement}
						style={styles.popper}
						{...attributes.popper}
					>
						{children}
					</Popover.Panel>
				)}
			</>
		</Popover>
	)
}
