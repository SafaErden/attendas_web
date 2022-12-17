/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationActions, PAGINATION_ACTION_TYPES } from './pagination.actions'

export interface IPagination {
	currentPage: number
}

export type PaginationState = {
	[k: string]: IPagination
}

const genereateState = () => ({
	currentPage: 1,
})

export const initialState: PaginationState = {
	users: genereateState(),
	funds: genereateState(),
	qozbs: genereateState(),
	investors: genereateState(),
	capzoneIds: genereateState(),
	assets: genereateState(),
}

export const PaginationReducer = (
	state: Readonly<PaginationState> = initialState,
	action: PaginationActions,
): PaginationState => {
	switch (action.type) {
		case PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE:
			return {
				...state,
				[action.data.stateName]: {
					...state[action.data.stateName],
					currentPage: action.data.pageNumber,
				},
			}

		default:
			return state
	}
}
