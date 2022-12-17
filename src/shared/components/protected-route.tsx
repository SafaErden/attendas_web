/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalState } from '../../redux/reducers'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { getLocalStorage } from '../../utils/helper'
interface IProtectedRouteProps {
	redirectPath?: string
	children?: any
}

export const ProtectedRoute = ({ redirectPath = '/login', children }: IProtectedRouteProps) => {
	const isAuthenticated = useSelector<IGlobalState, boolean>((state) => state.user.isAuthenticated)
	const userData = getLocalStorage('user')

	if (!isAuthenticated && !userData) {
		return <Navigate to={redirectPath} replace />
	}

	return children ? children : <Outlet />
}
