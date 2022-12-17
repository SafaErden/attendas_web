/* eslint-disable @typescript-eslint/ban-ts-comment */

import { IUser } from '../pages/Users/users'

export const setLocalStorage = <T>(id: string, data: T) =>
	typeof window !== undefined && localStorage?.setItem(id, JSON.stringify(data))

// @ts-ignore
export const getLocalStorage: <T>(id: string) => T = <T>(id: string): T => {
	if (typeof window !== undefined && window?.location?.pathname !== '/form/on-basvuru') {
		// @ts-ignore
		return JSON.parse(localStorage?.getItem(id))
	}
}

export const removeFromLocalStorage: (key: string) => void = (key: string) =>
	typeof window !== undefined && localStorage?.removeItem(key)

export const parseJwt: (token: string) => IUser = (token: string) => {
	const base64Url: string = token?.split('.')[1]
	const base64: string = base64Url?.replace(/-/g, '+').replace(/_/g, '/')

	const jsonPayload: string = decodeURIComponent(
		Buffer.from(base64, 'base64')
			.toString('base64')
			.split('')
			.map((c: string) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join(''),
	)

	return JSON.parse(jsonPayload)
}

export const transformSearchParamsProperty = (param: Record<'label' | 'value', string>[]): string[] =>
	param?.map(({ value }) => value)
