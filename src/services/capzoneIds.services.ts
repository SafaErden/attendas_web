/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICapzoneId } from '../pages/CapzoneIds/capzoneIds'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'
import * as qs from 'qs'

export const getCapzoneIds = (query: string) => request.get(endpoints.capzoneIds(query))
export const getCZIDWithId = ({ query, id, type }: any) => request.get(endpoints.getCZIDWithId(id, query, type))
export const getCapzoneId = (capzoneIdId: string) => request.get(endpoints.getCapzoneId(capzoneIdId))
export const createCapzoneId = (data: Partial<ICapzoneId>) => request.post(endpoints.createCapzoneId(), data)
export const editCapzoneId = ({ capZoneId, ...rest }: Partial<ICapzoneId>) =>
	request.put(endpoints.editCapzoneId(qs.stringify({ czidId: capZoneId })), rest)
export const deleteCapzoneId = (capzoneIdId: string) => request.delete(endpoints.deleteCapzoneId(capzoneIdId))
export const activateCapzoneId = (capzoneIdId: string) => request.put(endpoints.activateCapzoneId(capzoneIdId))
export const deactivateCapzoneId = (capzoneIdId: string) => request.put(endpoints.deactivateCapzoneId(capzoneIdId))
export const getAllQozbs = () => request.get(endpoints.allQozbs())
export const getAllFunds = () => request.get(endpoints.allFunds())
export const getAllInvestors = () => request.get(endpoints.allInvestors())
export const getAllUsers = () => request.get(endpoints.allUsers())
export const getInvestorQuestions = () => request.get(endpoints.getInvestorQuestions())
export const getInvestorRelations = (capzoneId: string) => request.get(endpoints.getInvestorRelations(capzoneId))
export const updateInvestorQuestions = (data: any) => request.put(endpoints.updateInvestorQuestions(), data)
export const createInvestorrelation = (data: any) => request.post(endpoints.updateInvestorQuestions(), data)
export const getQOZBQuestions = () => request.get(endpoints.getQOZBQuestions())
export const getQOZBRelations = (capzoneId: string) => request.get(endpoints.getQOZBRelations(capzoneId))
export const updateQOZBQuestions = (data: any) => request.put(endpoints.updateQOZBQuestions(), data)
export const createQOZBrelation = (data: any) => request.post(endpoints.updateQOZBQuestions(), data)
