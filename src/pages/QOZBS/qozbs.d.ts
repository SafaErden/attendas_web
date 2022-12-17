import { IQuestion } from '../CapzoneIds/capzoneIds'
import { IContact } from '../Funds/funds'
import { IPermisson, IRole } from '../Login/login'

export type QozbProps = {
	[k: string]: unknown
	in?: boolean
}

export interface IQOZB {
	businessId: number | string
	businessType: IBussinesType
	businessName: string
	doingBusinessAs: string
	censusTract: string
	taxId: string
	email: string
	phone: string
	country: string
	city: string
	street: string
	state: string
	zipCode: string
	contacts: Partial<IContact>[]
	otherEntity: string
	ozLocated: string | boolean
	disregardedEntity: string | boolean
	moreThanOneShareholder: string | boolean
	taxCreditAdvantage: string | boolean
	qoZoneLocated: string | boolean
	ownsOrLeaseProperty: string | boolean
	hasPurposeStatement: string | boolean
	qoFundHoldsInterest: string | boolean
	active: boolean
	createdOn: string
	createdByUser: ICreatedByUser
	permissions: IPermisson[]
	investors: number
	totalMoney: number
	businessTypeId: number | string
	entityTypeId: number | string
	oZoneLocatedProperty: string | boolean
	propertyOwnerId: number | string
	answers?: IQuestion[]
}

export interface IQozbFilter {
	search?: string
	location?: ILocation
	size?: number
	page?: number
}

export interface ICreatedByUser extends IContact {
	userId: number
	firstName: string
	lastName: string
	email: string
	roleId: string
	roleName: string
	role: IRole
}

export interface IBussinesType {
	businessTypeId: string
	businessTypeName: string
	businessTypeDescription: string
}

export interface IQozbLocation {
	state: string
	stateName: string
	qozbsCount: number
}

export interface IPutQozbContactsData {
	businessId: string | number
	contacts: Partial<IContact>[]
}

export interface IDeleteQozbCOntactData {
	businessId?: string | number
	contactId: string
}

export interface IAssetType {
	assetTypeId: string
	assetTypeName: string
	assetTypeDescription: string
}

export interface IAsset {
	assetId: string
	value: string
	businessId: string
	assetType: IAssetType
	assetTypeId: string
	assetName: string
	assetDescription: string
	active: boolean
	createdOn: string
	createdByUser: ICreatedByUser
	totalAmountFirstSixMonths: number
	totalAssetsFirstSixMonths: number
	propertyAmountFirstSixMonths: number
	totalAmountFirstYear: number
	totalAssetsFirstYear: number
	propertyAmountFirstYear: number
	propertyAcquiredOn: string
	mobilePropertyInOZone: string | boolean
	inventoryInTransit: string | boolean
}

export interface IUpdateAssetData {
	qozbId: string
	assetId: string
	asset: Partial<IAsset>
}

export interface IAllAssetsFilter {
	page?: number
	size?: number
	search?: string
}

export interface IQOZBAssetFilter {
	qozbId: string
	assetId: string
}

export interface IQOZBAssetFilterandData {
	qozbId: string
	assetId?: string
	data: Partial<IAsset>
}

export interface IQozbAssetsResponse {
	count: number
	bussinessId: string
	assets: IAsset[]
}

export interface IAnyQuestions {
	answers: IQuestion[]
	assetId?: string
}

export interface IAssetQuestionsCreateOrUpdateData {
	assetId: string
	answers: IQuestion[]
	isRelation: boolean
	qozbId: string
}
