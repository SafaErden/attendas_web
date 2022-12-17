/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker, { PickerProps } from 'antd/es/date-picker/generatePicker'
import './form-date-picker.css'

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

export const Picker = (props: PickerProps<Dayjs>) => {
	return <DatePicker className='capzone-picker' allowClear {...props} />
}

export const Months: Record<number, string> = {
	0: 'January',
	1: 'February',
	2: 'March',
	3: 'April',
	4: 'May',
	5: 'June',
	6: 'July',
	7: 'August',
	8: 'September',
	9: 'October',
	10: 'November',
	11: 'December',
}
