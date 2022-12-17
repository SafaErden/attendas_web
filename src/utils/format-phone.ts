import { formatPhoneNumberIntl } from 'react-phone-number-input'

export const formatPhone = (phone: string) => {
	const phoneNumber = formatPhoneNumberIntl(phone)

	const phoneArray = phoneNumber.split(' ')

	return phoneArray
		.map((num, ind) => (ind === 1 ? `(${num})` : ind == 2 ? `${num}-${phoneArray[3]}` : ind === 3 ? '' : num))
		.join(' ')
		.trim()
}
