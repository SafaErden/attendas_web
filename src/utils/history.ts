import { createBrowserHistory, BrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

const browserHistory: BrowserHistory = createBrowserHistory()

export const reduxHistoryContext = createReduxHistoryContext({
	history: browserHistory,
	//other options if needed
})
