import configureStore, { InjectedStore } from '../redux/configureStore'
import { reduxHistoryContext } from '../utils/history'

export const store: InjectedStore = configureStore({})
export const history = reduxHistoryContext.createReduxHistory(store)
