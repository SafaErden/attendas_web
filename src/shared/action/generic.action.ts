/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from 'redux'

export interface IGenericAction {
	<T extends { data?: any; type: any }>({ data, type }: T): AnyAction
}

export const GenericActionCreator: IGenericAction = ({ data, type }): AnyAction => ({
	type,
	data,
})
