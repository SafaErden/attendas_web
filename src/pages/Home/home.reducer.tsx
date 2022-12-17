import { HomeActions, HOME_ACTION_TYPES } from './home.actions'

export interface IHomeState {
	activeTab: string
}

export const initialState: IHomeState = {
	activeTab: '',
}

export const HomeReducer = (state: Readonly<IHomeState> = initialState, action: HomeActions): IHomeState => {
	switch (action.type) {
		case HOME_ACTION_TYPES.SET_ACTIVE_TAB:
			return { ...state, activeTab: action.data }

		default:
			return state
	}
}
