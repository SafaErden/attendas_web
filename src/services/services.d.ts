import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IPaginatedRequest {
	page?: string
	pageSize?: string
}

export interface IRequestHandlerParams<TRequest> {
	options?: Record<string, string>
	axiosConfig?: AxiosRequestConfig<TRequest>
	data: TRequest
}

export type RequestHandler<TRequest = null> = (params: IRequestHandlerParams<TRequest>) => Promise<AxiosResponse>

export interface IRequestModel {
	/**
	 * @param action
	 * @param {string} val - to add values to endpoint URI
	 * @param {string} id - to add an id to endpoint URI
	 * @param {D} data
	 * @param {AxiosRequestConfig} config
	 * @returns {Promise<AxiosResponse<R>>}
	 */ <R, D = void>({
		data,
		config,
		formValues,
	}: {
		data?: D
		formValues?: IAddCatalogProductForm
		config?: AxiosRequestConfig
	}): Promise<AxiosResponse<R>>
}
