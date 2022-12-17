export enum HOME_ACTION_TYPES {
	SET_ACTIVE_TAB = '[Home] Set Active Tab',
}

export interface ISetActiveTab {
	type: HOME_ACTION_TYPES.SET_ACTIVE_TAB
	data: string
}

export type HomeActions = ISetActiveTab
