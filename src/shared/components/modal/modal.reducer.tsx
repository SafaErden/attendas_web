/* eslint-disable @typescript-eslint/no-explicit-any */

import { ModalActions, MODAL_ACTION_TYPES } from './modal.actions'
import { MODAL_NAMES } from './modal.contsants'

const MODALS = [MODAL_NAMES.CONTACT, MODAL_NAMES.QOZB_CONTACT, MODAL_NAMES.DELETE_DATA, MODAL_NAMES.QOZB_LOCATION]

export interface IModalState {
	[k: string]: boolean
}

const generateInitialState = (stateName?: string): IModalState => {
	if (stateName) {
		return MODALS.filter((m) => m !== stateName).reduce((acc: Record<string, boolean>, name: string) => {
			acc[name] = false
			return acc
		}, {})
	}

	return MODALS.reduce((acc: Record<string, boolean>, m: string) => {
		acc[m] = false
		return acc
	}, {})
}

export const initialState: IModalState = {
	...generateInitialState(),
}

export const ModalReducer = (state: Readonly<IModalState> = initialState, action: ModalActions): IModalState => {
	switch (action.type) {
		case MODAL_ACTION_TYPES.TOGGLE_MODAL:
			return { [action.data.stateName]: !state[action.data.stateName], ...generateInitialState(action.data.stateName) }

		default:
			return state
	}
}
