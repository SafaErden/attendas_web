/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption, IRelationValue } from '../../shared/types'
import { IFund, IFundType } from '../Funds/funds'
import { IPermisson } from '../Login/login'
import { ICreatedByUser, IQOZB } from '../QOZBS/qozbs'

export interface ICapzoneId {
	capZoneId: string
	investor: ICapzoneInvestor
	fund: ICapzoneFund
	business: ICapzoneQozb
	assignedToUser: ICreatedByUser
	active: boolean
	createdOn: string
	createdByUser: ICreatedByUser
	permissions: IPermisson[]
	investorId: string
	fundId: string
	businessId: string
	assignedTo: string
	dateOfLastInput: string
	userOfLastInput: string
}

export interface ICapzoneInvestor {
	investorId: string
	firstName: string
	lastName: string
	companyName: string
	email: string
	createdDate: string
}

export interface ICapzoneFund {
	fundId: string
	fundType: IFundType
	fundName: string
}

export interface ICapzoneQozb {
	businessId: string
	businessTypeId: string
	businessName: string
}

export interface ICapzoneIdsFilter {
	page: number
	size: number
	search?: string
	investor?: string
	fund?: string
	qozb?: string
}

export interface ICapzoneIdWithIdsFilter {
	page: number
	size: number
	investorId?: string
	fundId?: string
	qozbId?: string
	type: 'fund' | 'qozb' | 'investor'
}

export interface ICapzoneIdDetailInfoData {
	fund?: IFund
	qozb?: IQOZB
	investor?: IInvestor
	user?: IUser
}

export interface ICZIDInvestorRelationShip {
	eligiableDate: IRelationValue<string>
	isInvestmentGain: IRelationValue
	investmentCashDate: IRelationValue<string>
	isK_1Expected: IRelationValue
	capitalGainReport: IRelationValue<(string | number)[]>
	waiveTreatyBenefits: IRelationValue
	providedTaxNumber: IRelationValue
	filedIRSForm8997: IRelationValue
	shortTermGainAmount: IRelationValue<string | number>
	longTermGainAmount: IRelationValue<string | number>
	totalHoldingsBegin: IRelationValue<string | number>
	giveInterestInTaxYear: IRelationValue
	giveInterestInTaxYearAmount?: string
	totalHoldingsEnd: IRelationValue<string | number>
	hasPairedTaxCredit: IRelationValue
	hasPairedTaxCreditAmount?: string
	hasCashFirstSixMonths: IRelationValue
	acceptBridgeDebt: IRelationValue
	cashAmountLastSixMonths: IRelationValue<string | number>
	notInvestedCashPercentage: IRelationValue<string | number>
	hasUSFundsReport: IRelationValue
	hasOffshoreFundsReport: IRelationValue
	interestSaleDate: IRelationValue<string>
	interestTransferredAmount: IRelationValue<string | number>
	isPropertyContributed: IRelationValue
}

export interface ICZIDQOZBRelationShip {
	hasShortTermInvest: IRelationValue
	hasInvestInQOZP: IRelationValue
	typeOfQOZProperty: IRelationValue<string | number>
	hasOriginalInsuranceIfStock: IRelationValue
	hasPurchasedForCash: IRelationValue
	hasInterestFromPartnership: IRelationValue
	hasDistributedToPartner: IRelationValue
	hasContributionOtherThanCash: IRelationValue
	hasPreviousOwnerShip: IRelationValue
	totalQOZP: IRelationValue<string | number>
	unAdjastedCostQOZP: IRelationValue<string | number>
	totalValueAssets: IRelationValue<string | number>
	unAdjustedtotalValueAssets: IRelationValue<string | number>
	hasBoughtRealEstate: IRelationValue
	hasPurchasedAfter2017: IRelationValue
	hasCOFanyTangibleProperty: IRelationValue
	hasCOFIntangibleProperty: IRelationValue
	hasCOFPurchasedFromRelatedParty: IRelationValue
	isUnderConstructionOnFirstTesting: IRelationValue
	hasRelatedPartyInvolvedConstruction: IRelationValue
	hasQOFUsedInATrade: IRelationValue
	isTnagibleUsedInQOZ: IRelationValue
	hasTangibleLeftOZ: IRelationValue
	isPropOriginalUse: IRelationValue
	isPropSubImproved: IRelationValue
	hasUsedALimAggTest: IRelationValue
	isLandOrEquipment: IRelationValue<string>
	isLandLeasedOrPurchased: IRelationValue<string>
	isEquipmentLeasedOrPurchased: IRelationValue<string>
	valuationMethod: IRelationValue<string | number>
	is90Good: IRelationValue
	hasHold90Interest: IRelationValue
	howQOZBValued: IRelationValue<string | number>
	hasSetParalelInvestment: IRelationValue
	lastEligibleGainExpectDate: IRelationValue<string>
	hasSubjectOrExt90: IRelationValue
	hasSellAnyQOZB: IRelationValue
	hasReinvestStrategy: IRelationValue
	hasQOFInterestedEXCForCash: IRelationValue
	dateOfInvestment: IRelationValue<string>
	stockPartnershipInterestInQozb: IRelationValue
}

export type CapzoneIdProps = Record<string, string>

export interface IQuestion {
	id: string | number
	name: string
	ifYesName?: string
	label: string
	options?: IOption[]
	values: QuestionValues[]
	type:
		| 'yesNo'
		| 'ifYes'
		| 'date'
		| 'multiChoice'
		| 'numberMoney'
		| 'numberPercent'
		| 'singleChoice'
		| 'number'
		| 'multiValue'
	order?: number
	version?: number
	active?: boolean
	ifYesValue?: string | number
}

export interface QuestionValues {
	id: string
	name: string
	type: 'textarea' | 'textinput' | 'percent'
	value?: any
	multiValue?: string[]
}
