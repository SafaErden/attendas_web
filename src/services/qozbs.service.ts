import {
	IDeleteQozbCOntactData,
	IPutQozbContactsData,
	IQOZB,
	IQOZBAssetFilter,
	IQOZBAssetFilterandData,
} from '@src/pages/QOZBS/qozbs'
import endpoints from '../services/endpoints'
import { request } from '../utils/request'

export const getQozbs = (query: string) => request.get(endpoints.qozbs(query))
export const getQozbQuestions = () => request.get(endpoints.getQozbQuestions())
export const getQozb = (qozbId: string) => request.get(endpoints.getQozb(qozbId))
export const getQozbQuestionAnswers = (qozbId: string) => request.get(endpoints.getQozbQuestionAnswers(qozbId))
export const createQozb = (data: Partial<IQOZB>) => request.post(endpoints.createQozb(), data)
export const createQozbQuestionAnswers = (data: Partial<IQOZB>) =>
	request.post(endpoints.createQozbQuestionAnswers(), data)
export const editQozb = ({ businessId, ...rest }: Partial<IQOZB>) =>
	request.put(endpoints.editQozb(businessId as string), rest)
export const editQozbQuestionAnswers = (data: Partial<IQOZB>) => request.put(endpoints.editQozbQuestionAnswers(), data)
export const getQozbTypes = () => request.get(endpoints.qozbTypes())
export const getQozbLocations = () => request.get(endpoints.qozbLocations())
export const deleteQozb = (data: string) => request.delete(endpoints.deleteQozb(data))
export const updateQozbContacts = (data: IPutQozbContactsData) => request.put(endpoints.qozbContacts(), data)
export const activateQozb = (data: string) => request.put(endpoints.activateQozb(data))
export const deactivateQozb = (data: string) => request.put(endpoints.deactivateQozb(data))
export const deleteQozbContact = (data: IDeleteQozbCOntactData) => request.delete(endpoints.deleteQozbContact(data))
export const getAssetTypes = () => request.get(endpoints.assetTypes())
export const getQozbAssets = (qozbId: string) => request.get(endpoints.getQozbAsset(qozbId))
export const getAllAssets = (query: string) => request.get(endpoints.allAssets(query))
export const getAssetDetail = (assetId: string) => request.get(endpoints.getAssetDetail(assetId))
export const createAsset = ({ qozbId, data }: IQOZBAssetFilterandData) =>
	request.post(endpoints.postAsset(qozbId), data)
export const updateAsset = ({ qozbId, assetId = '', data }: IQOZBAssetFilterandData) =>
	request.put(endpoints.updateAsset({ qozbId, assetId }), data)
export const deleteAsset = (data: IQOZBAssetFilter) => request.delete(endpoints.deleteAsset(data))
export const activateAsset = (data: IQOZBAssetFilter) => request.put(endpoints.activateAsset(data))
export const deactivateAsset = (data: IQOZBAssetFilter) => request.put(endpoints.deactivateAsset(data))
export const getAssetQuestions = () => request.get(endpoints.getAssetQuestions())
export const getAssetRelation = (data: string) => request.get(endpoints.getAssetRelation(data))
export const updateAssetRelation = (data: string) => request.put(endpoints.createOrUpdateAssetRelation(), data)
export const createAssetRelation = (data: string) => request.post(endpoints.createOrUpdateAssetRelation(), data)
