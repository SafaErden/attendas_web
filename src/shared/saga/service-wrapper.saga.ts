/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { call, cancelled } from 'redux-saga/effects'

export function* serviceWrapperSaga<T1 extends Array<unknown>>(
	fn: (...args: any[]) => unknown,
	handleError: (res: any) => void,
	...args: T1
): Generator<any> {
	const CancelToken = axios.CancelToken
	const source = CancelToken.source()

	try {
		return yield call(fn, ...args, { cancelToken: source.token })
	} catch (e: any) {
		const { response }: { response: AxiosResponse } = e

		yield handleError(response)
		throw new Error(response?.data?.errorType)
	} finally {
		if (yield cancelled()) {
			yield source.cancel()
		}
	}
}
