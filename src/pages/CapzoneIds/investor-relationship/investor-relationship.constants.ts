// import { ERROR_MESSAGES } from '../../../utils/error-messages'
import { object } from 'yup'
import { ICZIDInvestorRelationShip, IQuestion } from '../capzoneIds'

const questionFinder = (name: string, questions?: IQuestion[] | null) => {
	return questions?.find((q) => q.name === name)
}

export const InvestorRelationinitialValues = (relationShip: IQuestion[] | null): ICZIDInvestorRelationShip => {
	return {
		eligiableDate: {
			recommendation: questionFinder('eligiableDate', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('eligiableDate', relationShip)?.values[0].value ?? '',
			value: questionFinder('eligiableDate', relationShip)?.values[2].value ?? '',
		},
		isInvestmentGain: {
			recommendation: questionFinder('isInvestmentGain', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isInvestmentGain', relationShip)?.values[0].value ?? '',
			value: questionFinder('isInvestmentGain', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		// recieveCashDate: {
		// 	recommendation: questionFinder(recieveCashDate?.values[1].value ?? '',
		// 	additionalNotes: questionFinder(recieveCashDate?.values[0] ?? '',
		// 	value: questionFinder(recieveCashDate?.values[2].value ?? '',
		// },
		investmentCashDate: {
			recommendation: questionFinder('investmentCashDate', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('investmentCashDate', relationShip)?.values[0].value ?? '',
			value: questionFinder('investmentCashDate', relationShip)?.values[2].value ?? '',
		},
		isK_1Expected: {
			recommendation: questionFinder('isK_1Expected', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isK_1Expected', relationShip)?.values[0].value ?? '',
			value: questionFinder('isK_1Expected', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		capitalGainReport: {
			recommendation: questionFinder('capitalGainReport', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('capitalGainReport', relationShip)?.values[0].value ?? '',
			value:
				questionFinder('capitalGainReport', relationShip)
					?.options?.filter((opt) => !!opt.value)
					.map((o) => o.id) ?? [],
		},
		waiveTreatyBenefits: {
			recommendation: questionFinder('waiveTreatyBenefits', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('waiveTreatyBenefits', relationShip)?.values[0].value ?? '',
			value: questionFinder('waiveTreatyBenefits', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		providedTaxNumber: {
			recommendation: questionFinder('providedTaxNumber', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('providedTaxNumber', relationShip)?.values[0].value ?? '',
			value: questionFinder('providedTaxNumber', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		filedIRSForm8997: {
			recommendation: questionFinder('filedIRSForm8997', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('filedIRSForm8997', relationShip)?.values[0].value ?? '',
			value: questionFinder('filedIRSForm8997', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		shortTermGainAmount: {
			recommendation: questionFinder('shortTermGainAmount', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('shortTermGainAmount', relationShip)?.values[0].value ?? '',
			value: questionFinder('shortTermGainAmount', relationShip)?.values[2].value ?? '',
		},
		longTermGainAmount: {
			recommendation: questionFinder('longTermGainAmount', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('longTermGainAmount', relationShip)?.values[0].value ?? '',
			value: questionFinder('longTermGainAmount', relationShip)?.values[2].value ?? '',
		},
		isPropertyContributed: {
			recommendation: questionFinder('isPropertyContributed', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isPropertyContributed', relationShip)?.values[0].value ?? '',
			value: questionFinder('isPropertyContributed', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		totalHoldingsBegin: {
			recommendation: questionFinder('totalHoldingsBegin', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('totalHoldingsBegin', relationShip)?.values[0].value ?? '',
			value: questionFinder('totalHoldingsBegin', relationShip)?.values[2].value ?? '',
		},
		giveInterestInTaxYear: {
			recommendation: questionFinder('giveInterestInTaxYear', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('giveInterestInTaxYear', relationShip)?.values[0].value ?? '',
			value: questionFinder('giveInterestInTaxYear', relationShip)?.options?.[1].value === 'true' ? '1' : '0',
		},
		giveInterestInTaxYearAmount: questionFinder('giveInterestInTaxYear', relationShip)?.values[2].value ?? '',
		totalHoldingsEnd: {
			recommendation: questionFinder('totalHoldingsEnd', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('totalHoldingsEnd', relationShip)?.values[0].value ?? '',
			value: questionFinder('totalHoldingsEnd', relationShip)?.values[2].value ?? '',
		},
		hasPairedTaxCredit: {
			recommendation: questionFinder('hasPairedTaxCredit', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasPairedTaxCredit', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasPairedTaxCredit', relationShip)?.options?.[1].value === 'true' ? '1' : '0',
		},
		hasPairedTaxCreditAmount: questionFinder('hasPairedTaxCredit', relationShip)?.values[2].value ?? '',
		hasCashFirstSixMonths: {
			recommendation: questionFinder('hasCashFirstSixMonths', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasCashFirstSixMonths', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasCashFirstSixMonths', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		acceptBridgeDebt: {
			recommendation: questionFinder('acceptBridgeDebt', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('acceptBridgeDebt', relationShip)?.values[0].value ?? '',
			value: questionFinder('acceptBridgeDebt', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		cashAmountLastSixMonths: {
			recommendation: questionFinder('cashAmountLastSixMonths', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('cashAmountLastSixMonths', relationShip)?.values[0].value ?? '',
			value: questionFinder('cashAmountLastSixMonths', relationShip)?.values[2].value ?? '',
		},
		notInvestedCashPercentage: {
			recommendation: questionFinder('notInvestedCashPercentage', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('notInvestedCashPercentage', relationShip)?.values[0].value ?? '',
			value: questionFinder('notInvestedCashPercentage', relationShip)?.values[2].value ?? '',
		},
		hasUSFundsReport: {
			recommendation: questionFinder('hasUSFundsReport', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasUSFundsReport', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasUSFundsReport', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasOffshoreFundsReport: {
			recommendation: questionFinder('hasOffshoreFundsReport', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasOffshoreFundsReport', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasOffshoreFundsReport', relationShip)?.values[2].value ? '1' : '0',
		},
		interestSaleDate: {
			recommendation: questionFinder('interestSaleDate', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('interestSaleDate', relationShip)?.values[0].value ?? '',
			value: questionFinder('interestSaleDate', relationShip)?.values[2].value ?? '',
		},
		interestTransferredAmount: {
			recommendation: questionFinder('interestTransferredAmount', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('interestTransferredAmount', relationShip)?.values[0].value ?? '',
			value: questionFinder('interestTransferredAmount', relationShip)?.values[2].value ?? '',
		},
	}
}

export const capzoneIdInvestorRelationValidatioSchema = object({
	// eligiableDate: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// recieveCashDate: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// investmentCashDate: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// shortTermGainAmount: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// longTermGainAmount: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// totalHoldingsBegin: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// totalHoldingsEnd: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// cashAmountLastSixMonths: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// notInvestedCashPercentage: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// interestSaleDate: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// interestTransferredAmount: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
})
