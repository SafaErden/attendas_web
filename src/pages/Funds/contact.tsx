import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { IContact } from './funds'
import './contact.css'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Badge } from '../../shared/components/badge'
import { formatPhone } from '../../utils/format-phone'

interface IContactProps {
	contact: Partial<IContact>
	showActions?: boolean
	withBorder?: boolean
	useTag?: boolean
	primaryContact?: boolean
	maxWidth?: string
	handleEditClick?: (contact: Partial<IContact>) => void
	handleDeleteClick?: (contact: Partial<IContact>) => void
}
export const Contact = ({
	contact,
	showActions = true,
	withBorder = true,
	useTag = false,
	primaryContact = false,
	maxWidth,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handleEditClick = () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	handleDeleteClick = () => {},
}: IContactProps) => {
	if (!contact) {
		return null
	}

	const withBorderClass = 'border border-gray-300 px-5 py-6'
	return (
		<div
			style={{ maxWidth }}
			className={`relative rounded-lg justify-between gap-3 flex items-center ${withBorder ? withBorderClass : ''}`}
		>
			{primaryContact && (
				<div className='absolute -top-3'>
					<Badge type={5} title='Primary' />
				</div>
			)}
			<div className='flex flex-col gap-1'>
				<span className='text-gray-900'>
					{contact.firstName} {contact.lastName} {contact.primary && '(Primary)'}
				</span>
				{useTag && contact.contactRole?.contactRoleId && contact.contactRole?.contactRoleName && (
					<Badge type={contact?.contactRole.contactRoleId} title={contact?.contactRole.contactRoleName} />
				)}
				{useTag && (!contact.contactRole?.contactRoleId || !contact.contactRole?.contactRoleName) && <span>-</span>}
				{!useTag && <span className='text-gray-500'>{contact?.contactRole?.contactRoleName ?? '-'}</span>}
			</div>
			<div className='flex flex-col gap-1'>
				<div className='text-gray-500 items-center flex gap-1'>
					<PhoneIcon className='w-3 h-3' />
					<span>{contact.phone ? formatPhone(contact.phone as string) : '-'}</span>
				</div>
				<div className='text-gray-500 items-center flex gap-1'>
					<MailIcon className='w-3 h-3' />
					<span>{contact.email}</span>
				</div>
			</div>
			{showActions && (
				<div className='flex items-center gap-2'>
					<div onClick={() => handleEditClick(contact)} className='cursor-pointer flex items-center gap-1'>
						<PencilIcon className='w-3 h-3' fill='#4338ca' />
						<span className='text-indigo-700'>Edit</span>
					</div>
					<div onClick={() => handleDeleteClick(contact)} className='cursor-pointer capzone-contact-delete'>
						<TrashIcon className='w-3 h-3' fill='#ff4f4f' />
					</div>
				</div>
			)}
		</div>
	)
}
