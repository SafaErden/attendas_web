import { IQuestion } from '../CapzoneIds/capzoneIds'

export interface IFund {
	fundId: string
	qoFund: boolean
	fundName: string
	employerId: string
	email: string
	phone: string
	city: string
	street: string
	state: string
	zipCode: string
	comments: string
	formationDate: string
	certificationDate: string
	createdOn: string
	fundTypeId: string
	overseaInvestor: boolean | string
	qofTaxYear: string
	firstTaxInSixMonths: boolean | string
	country: string
	entityType: IFundEntityType
	entityTypeId: number
	active: boolean
	fundType: IFundType
	createdByUser: IContact
	contacts?: Partial<IContact>[]
	capzoneId?: string
	amount?: number
	capzoneIdCount: number
	answers?: IQuestion[]
}

export interface IFundsFilter {
	page: number
	size: number
	search?: string
	location?: ILocation
	type?: IFundEntityType
}

export interface IFundType {
	fundTypeId: string
	fundTypeName: string
	fundTypeDescription: string
}

export interface IFundEntityType {
	entityTypeId: number
	entityTypeName: string
}

export interface ILocation {
	state: string
	stateName: string
}

export interface IContact {
	contactId?: string
	firstName: string
	lastName: string
	email: string | null
	phone: string | null
	contactRole: {
		contactRoleId: number
		contactRoleName: string
	}
	contactRoleId?: number
	tempId?: string
	primary: boolean
}

export type FundProps = Record<string, string>

export type ICreateEditContactProps = {
	[k: string]: unknown
}
