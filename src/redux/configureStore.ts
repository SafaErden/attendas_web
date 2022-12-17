/**
 * Create the store with dynamic reducers
 */

import { ENVIRONMENT } from '../config/index'
import { DEVELOPMENT } from '../config/config.constants'
import { createReducer, IGlobalState } from '../redux/reducers'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import {
	AnyAction,
	applyMiddleware,
	compose,
	createStore,
	Dispatch,
	Middleware,
	Reducer,
	Store,
	StoreEnhancerStoreCreator,
} from 'redux'
import rootSaga from '../redux/sagas'
import { reduxHistoryContext } from '../utils/history'

interface IStoreInjection {
	injectedReducers: { [k: string]: Reducer<keyof IGlobalState, AnyAction> }
	injectedSagas: { [k: string]: unknown }

	runSaga(saga: unknown): unknown
}

export type InjectedStore = Store & IStoreInjection

const { routerMiddleware } = reduxHistoryContext
export default (initialState: Record<string, unknown> = {}): InjectedStore => {
	let composeEnhancers = compose

	const reduxSagaMonitorOptions: { onError: (error: never) => void } = {
		onError: (error: never) => {
			window.setTimeout(() => {
				console.log(error)
			}, 0)
		},
	}

	// If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
	/* istanbul ignore next */

	if (ENVIRONMENT.ENV === DEVELOPMENT && typeof window === 'object') {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		/* @ts-ignore */
		if (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/* @ts-ignore */
			composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
		}

		// NOTE: Uncomment the code below to restore support for Redux Saga
		// Dev Tools once it supports redux-saga version 1.x.x
		// if (window['__SAGA_MONITOR_EXTENSION__']) reduxSagaMonitorOptions.sagaMonitor = window['__SAGA_MONITOR_EXTENSION__'];
	}

	const sagaMiddleware: SagaMiddleware<Record<string, unknown>> = createSagaMiddleware(reduxSagaMonitorOptions)

	// Create the store with two middlewares
	// 1. sagaMiddleware: Makes redux-sagas work
	// 2. routerMiddleware: Syncs the location/URL path to the state
	const middlewares: (
		| SagaMiddleware<Record<string, unknown>>
		| Middleware<Record<string, unknown>, unknown, Dispatch>
	)[] = [sagaMiddleware, routerMiddleware]

	const enhancers: ((next: StoreEnhancerStoreCreator) => StoreEnhancerStoreCreator<{ dispatch: unknown }, unknown>)[] =
		[applyMiddleware(...middlewares)]
	const store: Store = createStore(createReducer(), initialState, composeEnhancers(...enhancers))

	const injectedStore: InjectedStore = {
		...store,
		injectedReducers: {},
		injectedSagas: {},
		runSaga: (saga: never) => sagaMiddleware.run(saga),
	}

	// Make reducers hot reloadable, see http://mxs.is/googmo
	/* istanbul ignore next */
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (module.hot) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		module.hot.accept('./reducers', () => {
			injectedStore.replaceReducer(createReducer(injectedStore.injectedReducers))
		})
	}

	sagaMiddleware.run(rootSaga)

	return injectedStore
}
