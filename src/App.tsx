import './App.css'
import { getLocalStorage } from './utils/helper'
import { useEffect } from 'react'
import { GenericActionCreator } from './shared/action/generic.action'
import { ISetLoginAction, LOGIN_ACTION_TYPES } from './pages/Login/login.actions'
import { useDispatch } from 'react-redux'
import { Home } from './pages/Home/home.lazy'
import { ISetRolesAction, USERS_ACTION_TYPES } from './pages/Users/users.actions'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const userData = getLocalStorage('user')
		if (userData) {
			dispatch(
				GenericActionCreator<ISetLoginAction>({
					type: LOGIN_ACTION_TYPES.SET_LOGIN,
					data: userData,
				}),
			)

			dispatch(
				GenericActionCreator<ISetRolesAction>({
					type: USERS_ACTION_TYPES.SET_ROLES,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					data: userData.roles,
				}),
			)
		}
	}, [])

	return <Home />
}

export default App
