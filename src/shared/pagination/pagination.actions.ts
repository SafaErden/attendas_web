/* eslint-disable @typescript-eslint/no-explicit-any */

export enum PAGINATION_ACTION_TYPES {
	SET_CURRENT_PAGE = '[Pagination] Set Page',
}

export interface ISetPageAction {
	type: PAGINATION_ACTION_TYPES
	data: {
		stateName: string
		pageNumber: number
	}
}

export type PaginationActions = ISetPageAction
