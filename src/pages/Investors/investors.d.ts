export interface IInvestor {
	investorId: string
	company: boolean
	companyName: string
	firstName: string
	lastName: string
	email: string
	phone: string
	country: string
	city: string
	street: string
	state: string
	zipCode: string
	certificationDate: string
	createdOn: string
	active: boolean
	createdByUser: IContact
	contacts?: Partial<IContact>[]
	totalActiveInvestment: number
	amount: number
	activeFundsCount: number
}

export interface IInvestorsFilter {
	page: number
	size: number
	search?: string
	location?: ILocation
}

export interface ILocation {
	state: string
	stateName: string
}

export type InvestorProps = Record<string, string>

export type ICreateEditContactProps = {
	[k: string]: unknown
}
