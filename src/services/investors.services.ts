import { IInvestor } from '@src/pages/Investors/investors'
import { IContact } from '../pages/Funds/funds'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'

export const getInvestors = (query: string) => request.get(endpoints.investors(query))
export const getInvestor = (investorId: string) => request.get(endpoints.getInvestor(investorId))
export const createInvestor = (data: Partial<IInvestor>) => request.post(endpoints.createInvestor(), data)
export const editInvestor = (data: Partial<IInvestor>) =>
	request.put(endpoints.editInvestor(data.investorId as string), data)
export const deleteInvestor = (investorId: string) => request.delete(endpoints.deleteInvestor(investorId))
export const getLocations = () => request.get(endpoints.investorLocations())
export const putInvestorContacts = (data: { investorId: string; contacts: Partial<IContact>[] }) =>
	request.put(endpoints.investorContacts(), data)
export const deleteInvestorContact = (data: { investorId: string; contactId: string }) =>
	request.delete(endpoints.deleteInvestorContact(data))
