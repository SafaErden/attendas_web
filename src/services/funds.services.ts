import { IContact, IFund } from '../pages/Funds/funds'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'

export const getFunds = (query: string) => request.get(endpoints.funds(query))
export const getFundsQuestions = () => request.get(endpoints.fundsQuestions())
export const getFund = (fundId: string) => request.get(endpoints.getFund(fundId))
export const getFundQuestionAnswers = (fundId: string) => request.get(endpoints.getFundQuestionAnswers(fundId))
export const createFund = (data: Partial<IFund>) => request.post(endpoints.createFund(), data)
export const createQuestionAnswers = (data: Partial<IFund>) => request.post(endpoints.createQuestionAnswers(), data)
export const editFund = (data: Partial<IFund>) => request.put(endpoints.editFund(data.fundId as string), data)
export const editFundQuestionAnswers = (data: Partial<IFund>) => request.put(endpoints.editFundQuestionAnswers(), data)
export const getFundTypes = () => request.get(endpoints.fundTypes())
export const getFundEntityTypes = () => request.get(endpoints.fundEntityTypes())
export const deleteFund = (fundId: string) => request.delete(endpoints.deleteFund(fundId))
export const activateFund = (fundId: string) => request.put(endpoints.activateFund(fundId))
export const deactivateFund = (fundId: string) => request.put(endpoints.deactivateFund(fundId))
export const getLocations = () => request.get(endpoints.locations())
export const putFundContacts = (data: { fundId: string; contacts: Partial<IContact>[] }) =>
	request.put(endpoints.fundContacts(), data)
export const deleteFundContact = (data: { fundId: string; contactId: string }) =>
	request.delete(endpoints.deleteFundContact(data))
