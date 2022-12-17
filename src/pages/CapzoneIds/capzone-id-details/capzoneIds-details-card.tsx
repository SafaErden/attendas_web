import { Avatar } from '../../../shared/components/avatar'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { IFund } from '../../Funds/funds'
import { IQOZB } from '../../QOZBS/qozbs'
import { IInvestor } from '../../Investors/investors'
import dayjs from 'dayjs'

interface ICapzoneIdsDetailCardProps {
	data?: IFund | IQOZB | IInvestor
}

export const CapzoneIdsDetailCard = ({ data }: ICapzoneIdsDetailCardProps) => {
	const navigate = useNavigate()

	const fundData = { ...(data ?? {}) } as IFund
	const qozbData = { ...(data ?? {}) } as IQOZB
	const investorData = { ...(data ?? {}) } as IInvestor

	const isFund = !!fundData?.fundId
	const isQOZB = !!qozbData?.businessId
	const isInvestor = !!investorData?.investorId

	const title = isFund ? 'Fund' : isQOZB ? 'QOZB' : 'Investor'

	const id = isFund ? fundData.fundId : isQOZB ? qozbData.businessId : investorData.investorId

	const onClick = () => {
		navigate(`/${title.toLowerCase()}s/detail/${id}`)
	}

	const footerText = `${title} details`
	return (
		<div className='bg-white rounded-lg shadow p-4 flex flex-col gap-7 flex-1'>
			<span className='text-gray-700 font-bold text-sm'>{title}</span>
			{!!data && (
				<div className='flex flex-1 gap-2'>
					{isInvestor && <Avatar size='xl' />}
					<div className='flex flex-col'>
						<span className='text-gray-700 font-bold'>
							{isInvestor
								? `${investorData?.firstName} ${investorData?.lastName}`
								: isFund
								? fundData.fundName
								: qozbData.businessName}
						</span>
						<span className='text-gray-500'>
							{isInvestor
								? investorData.investorId
								: '#' + `${isFund ? fundData.fundId : qozbData.businessId}`.padStart(7, '0')}
						</span>
						<span className='text-gray-500'>
							{isInvestor
								? `${investorData.city}, ${investorData.country}`
								: dayjs(isFund ? fundData.createdOn : qozbData.createdOn).format('MM/DD/YYYY')}
						</span>
						{isInvestor && <span className='text-gray-500'>Amount: {investorData?.amount ?? '-'}</span>}
						{isFund && <span className='text-gray-500'>Amount: {fundData?.amount ?? '-'}</span>}
						{isQOZB && <span className='text-gray-500'>Type: {qozbData?.businessType?.businessTypeName ?? '-'}</span>}
					</div>
				</div>
			)}

			{!!data && (
				<div onClick={onClick} className='flex gap-2 cursor-pointer items-center'>
					<span className='text-blue-800 font-medium'>{footerText}</span>
					<ArrowRightIcon className='text-blue-800 w-3 h-3' />
				</div>
			)}
		</div>
	)
}
