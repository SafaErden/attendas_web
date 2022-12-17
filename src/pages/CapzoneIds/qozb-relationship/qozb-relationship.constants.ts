import { object } from 'yup'
import { ICZIDQOZBRelationShip, IQuestion } from '../capzoneIds'

const questionFinder = (name: string, questions?: IQuestion[] | null) => {
	return questions?.find((q) => q.name === name)
}

export const QOZBRelationinitialValues = (relationShip: IQuestion[] | null): ICZIDQOZBRelationShip => {
	return {
		hasShortTermInvest: {
			recommendation: questionFinder('hasShortTermInvest', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasShortTermInvest', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasShortTermInvest', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasInvestInQOZP: {
			recommendation: questionFinder('hasInvestInQOZP', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasInvestInQOZP', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasInvestInQOZP', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		typeOfQOZProperty: {
			recommendation: questionFinder('typeOfQOZProperty', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('typeOfQOZProperty', relationShip)?.values[0].value ?? '',
			value:
				questionFinder('typeOfQOZProperty', relationShip)?.values[2].value ||
				questionFinder('typeOfQOZProperty', relationShip)?.options?.[0].id ||
				'',
		},
		hasOriginalInsuranceIfStock: {
			recommendation: questionFinder('hasOriginalInsuranceIfStock', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasOriginalInsuranceIfStock', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasOriginalInsuranceIfStock', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasPurchasedForCash: {
			recommendation: questionFinder('hasPurchasedForCash', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasPurchasedForCash', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasPurchasedForCash', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasInterestFromPartnership: {
			recommendation: questionFinder('hasInterestFromPartnership', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasInterestFromPartnership', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasInterestFromPartnership', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasDistributedToPartner: {
			recommendation: questionFinder('hasDistributedToPartner', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasDistributedToPartner', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasDistributedToPartner', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasContributionOtherThanCash: {
			recommendation: questionFinder('hasContributionOtherThanCash', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasContributionOtherThanCash', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasContributionOtherThanCash', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasPreviousOwnerShip: {
			recommendation: questionFinder('hasPreviousOwnerShip', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasPreviousOwnerShip', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasPreviousOwnerShip', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		totalQOZP: {
			recommendation: questionFinder('totalQOZP', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('totalQOZP', relationShip)?.values[0].value ?? '',
			value: questionFinder('totalQOZP', relationShip)?.values[2].value ?? '',
		},
		unAdjastedCostQOZP: {
			recommendation: questionFinder('unAdjastedCostQOZP', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('unAdjastedCostQOZP', relationShip)?.values[0].value ?? '',
			value: questionFinder('unAdjastedCostQOZP', relationShip)?.values[2].value ?? '',
		},
		totalValueAssets: {
			recommendation: questionFinder('totalValueAssets', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('totalValueAssets', relationShip)?.values[0].value ?? '',
			value: questionFinder('totalValueAssets', relationShip)?.values[2].value ?? '',
		},
		unAdjustedtotalValueAssets: {
			recommendation: questionFinder('unAdjustedtotalValueAssets', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('unAdjustedtotalValueAssets', relationShip)?.values[0].value ?? '',
			value: questionFinder('unAdjustedtotalValueAssets', relationShip)?.values[2].value ?? '',
		},
		hasBoughtRealEstate: {
			recommendation: questionFinder('hasBoughtRealEstate', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasBoughtRealEstate', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasBoughtRealEstate', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasPurchasedAfter2017: {
			recommendation: questionFinder('hasPurchasedAfter2017', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasPurchasedAfter2017', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasPurchasedAfter2017', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasCOFanyTangibleProperty: {
			recommendation: questionFinder('hasCOFanyTangibleProperty', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasCOFanyTangibleProperty', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasCOFanyTangibleProperty', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasCOFIntangibleProperty: {
			recommendation: questionFinder('hasCOFIntangibleProperty', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasCOFIntangibleProperty', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasCOFIntangibleProperty', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasCOFPurchasedFromRelatedParty: {
			recommendation: questionFinder('hasCOFPurchasedFromRelatedParty', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasCOFPurchasedFromRelatedParty', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasCOFPurchasedFromRelatedParty', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		isUnderConstructionOnFirstTesting: {
			recommendation: questionFinder('isUnderConstructionOnFirstTesting', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isUnderConstructionOnFirstTesting', relationShip)?.values[0].value ?? '',
			value: questionFinder('isUnderConstructionOnFirstTesting', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasRelatedPartyInvolvedConstruction: {
			recommendation: questionFinder('hasRelatedPartyInvolvedConstruction', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasRelatedPartyInvolvedConstruction', relationShip)?.values[0].value ?? '',
			value:
				questionFinder('hasRelatedPartyInvolvedConstruction', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasQOFUsedInATrade: {
			recommendation: questionFinder('hasQOFUsedInATrade', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasQOFUsedInATrade', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasQOFUsedInATrade', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		isTnagibleUsedInQOZ: {
			recommendation: questionFinder('isTnagibleUsedInQOZ', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isTnagibleUsedInQOZ', relationShip)?.values[0].value ?? '',
			value: questionFinder('isTnagibleUsedInQOZ', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasTangibleLeftOZ: {
			recommendation: questionFinder('hasTangibleLeftOZ', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasTangibleLeftOZ', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasTangibleLeftOZ', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		isPropOriginalUse: {
			recommendation: questionFinder('isPropOriginalUse', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isPropOriginalUse', relationShip)?.values[0].value ?? '',
			value: questionFinder('isPropOriginalUse', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		isPropSubImproved: {
			recommendation: questionFinder('isPropSubImproved', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isPropSubImproved', relationShip)?.values[0].value ?? '',
			value: questionFinder('isPropSubImproved', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasUsedALimAggTest: {
			recommendation: questionFinder('hasUsedALimAggTest', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasUsedALimAggTest', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasUsedALimAggTest', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		isLandOrEquipment: {
			recommendation: questionFinder('isLandOrEquipment', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isLandOrEquipment', relationShip)?.values[0].value ?? '',
			value:
				(questionFinder('isLandOrEquipment', relationShip)?.values[2].value ||
					questionFinder('isLandOrEquipment', relationShip)?.options?.[0].id) ??
				'',
		},
		isLandLeasedOrPurchased: {
			recommendation: questionFinder('isLandLeasedOrPurchased', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isLandLeasedOrPurchased', relationShip)?.values[0].value ?? '',
			value:
				(questionFinder('isLandLeasedOrPurchased', relationShip)?.values[2].value ||
					questionFinder('isLandLeasedOrPurchased', relationShip)?.options?.[0].id) ??
				'',
		},
		isEquipmentLeasedOrPurchased: {
			recommendation: questionFinder('isEquipmentLeasedOrPurchased', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('isEquipmentLeasedOrPurchased', relationShip)?.values[0].value ?? '',
			value:
				(questionFinder('isEquipmentLeasedOrPurchased', relationShip)?.values[2].value ||
					questionFinder('isEquipmentLeasedOrPurchased', relationShip)?.options?.[0].id) ??
				'',
		},
		is90Good: {
			recommendation: questionFinder('is90Good', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('is90Good', relationShip)?.values[0].value ?? '',
			value: questionFinder('is90Good', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasHold90Interest: {
			recommendation: questionFinder('hasHold90Interest', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasHold90Interest', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasHold90Interest', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		valuationMethod: {
			recommendation: questionFinder('valuationMethod', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('valuationMethod', relationShip)?.values[0].value ?? '',
			value:
				(questionFinder('valuationMethod', relationShip)?.values[2].value ||
					questionFinder('valuationMethod', relationShip)?.options?.[0].id) ??
				'',
		},
		howQOZBValued: {
			recommendation: questionFinder('howQOZBValued', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('howQOZBValued', relationShip)?.values[0].value ?? '',
			value:
				questionFinder('howQOZBValued', relationShip)?.values[2].value ||
				questionFinder('howQOZBValued', relationShip)?.options?.[0].id ||
				'',
		},
		hasSetParalelInvestment: {
			recommendation: questionFinder('hasSetParalelInvestment', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasSetParalelInvestment', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasSetParalelInvestment', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		lastEligibleGainExpectDate: {
			recommendation: questionFinder('lastEligibleGainExpectDate', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('lastEligibleGainExpectDate', relationShip)?.values[0].value ?? '',
			value: questionFinder('lastEligibleGainExpectDate', relationShip)?.values[2].value ?? '',
		},
		hasSubjectOrExt90: {
			recommendation: questionFinder('hasSubjectOrExt90', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasSubjectOrExt90', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasSubjectOrExt90', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},

		hasSellAnyQOZB: {
			recommendation: questionFinder('hasSellAnyQOZB', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasSellAnyQOZB', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasSellAnyQOZB', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasReinvestStrategy: {
			recommendation: questionFinder('hasReinvestStrategy', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasReinvestStrategy', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasReinvestStrategy', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		hasQOFInterestedEXCForCash: {
			recommendation: questionFinder('hasQOFInterestedEXCForCash', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('hasQOFInterestedEXCForCash', relationShip)?.values[0].value ?? '',
			value: questionFinder('hasQOFInterestedEXCForCash', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
		dateOfInvestment: {
			recommendation: questionFinder('dateOfInvestment', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('dateOfInvestment', relationShip)?.values[0].value ?? '',
			value: questionFinder('dateOfInvestment', relationShip)?.values[2].value ?? '',
		},
		stockPartnershipInterestInQozb: {
			recommendation: questionFinder('stockPartnershipInterestInQozb', relationShip)?.values[1].value ?? '',
			additionalNotes: questionFinder('stockPartnershipInterestInQozb', relationShip)?.values[0].value ?? '',
			value: questionFinder('stockPartnershipInterestInQozb', relationShip)?.values[2].value === 'true' ? '1' : '0',
		},
	}
}

export const capzoneIdQOZBRelationValidatioSchema = object({
	// totalQOZP: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// unAdjastedCostQOZP: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// totalValueAssets: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// unAdjustedtotalValueAssets: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// lastEligibleGainExpectDate: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
	// dateOfInvestment: object().shape({
	// 	value: string().nullable().required(ERROR_MESSAGES.required()),
	// }),
})
