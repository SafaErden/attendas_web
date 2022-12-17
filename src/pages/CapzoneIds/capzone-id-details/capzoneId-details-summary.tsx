/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from '../../../shared/components/text'
import { ComplianceIcon } from '../../../shared/components/compliance-icons'
import { CalendarIcon, ChartPieIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import dayjs from 'dayjs'
import { ICapzoneId } from '../capzoneIds'
import { useSelector } from 'react-redux'
import { IGlobalState } from '../../../redux/reducers'
import { Contact } from '../../../pages/Funds/contact'

interface ICapzoneIdProps {
	capzoneId: ICapzoneId
}

export const CapzoneIdDetailsSummary = ({ capzoneId }: ICapzoneIdProps) => {
	const { investor, selectedCapzoneId } = useSelector((state: IGlobalState) => state.capzoneIds)
	const user = selectedCapzoneId?.assignedToUser
	return (
		<div className='bg-white rounded-lg gap-2 shadow p-4 flex-col flex flex-1'>
			<Text color='headingNormal'>Summary</Text>
			<Text weight='semiBold' color='success'>
				Mostly Compliant
			</Text>
			<div className='flex flex-col lg:flex-row justify-between gap-5 lg:gap-2 mt-3'>
				<div className='flex flex-col gap-3'>
					<div className='flex gap-2 items-center'>
						<ComplianceIcon type='success' />
						<Text color='success'>17 Normal operations</Text>
					</div>
					<div className='flex gap-2 items-center'>
						<ComplianceIcon type='warning' />
						<Text color='warning'>5 Active alerts </Text>
					</div>

					<div className='flex gap-2 items-center'>
						<ComplianceIcon type='error' />
						<Text color='error'>1 Compliance issue</Text>
					</div>
					<div className='flex gap-2 items-center'>
						<ComplianceIcon type='gray' />
						<Text color='lightGray'>8 Incomplete items</Text>
					</div>
				</div>

				<div className='flex flex-col gap-3'>
					<div className='flex gap-2 items-center'>
						<CalendarIcon className='w-4 h-4' />
						<Text>Date of investment:</Text>
						<Text color='headingNormal' weight='semiBold'>
							{dayjs(capzoneId?.investor.createdDate).format('MM/DD/YYYY')}
						</Text>
					</div>
					<div className='flex gap-2 items-center'>
						<CurrencyDollarIcon className='w-4 h-4' />
						<Text>Funds Invested:</Text>
						<Text color='headingNormal' weight='semiBold'>
							{dayjs(investor?.createdOn).format('MM/DD/YYYY')}
						</Text>
					</div>
					<div className='flex gap-2 items-center'>
						<ChartPieIcon className='w-4 h-4' />
						<Text>Data completion:</Text>
						<Text color='headingNormal' weight='semiBold'>
							70%
						</Text>
					</div>
				</div>

				<div className='flex flex-col gap-3'>
					<Text color='lightGray'>Assigned To</Text>
					<Contact
						showActions={false}
						withBorder={false}
						useTag
						contact={
							{
								...user,
								contactRole: { contactRoleId: user?.role?.roleId, contactRoleName: user?.role?.roleName },
							} as any
						}
					/>
				</div>
			</div>
		</div>
	)
}
