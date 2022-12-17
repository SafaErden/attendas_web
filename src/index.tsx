import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import reportWebVitals from './reportWebVitals'
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from 'dayjs/plugin/updateLocale'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'
import dayjs from 'dayjs'
import { ToastContainer } from 'react-toastify'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/login.lazy'
import { ProtectedRoute } from './shared/components/protected-route'

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.min.css'
import './index.css'
import { MAIN_ROUTES } from './shared/route.enums'
import ForgotPassword from './pages/Login/forgot-password'
import VerifyEmail from './pages/Login/verify-email'
import ResetPassword from './pages/Login/reset-password'

dayjs.extend(updateLocale)
dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<Router history={history}>
			<Suspense fallback={<div>Loading...</div>}>
				<ToastContainer
					position='top-right'
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path={MAIN_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
					<Route path={MAIN_ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
					<Route path={MAIN_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

					<Route element={<ProtectedRoute />}>
						<Route path='/*' element={<App />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	</Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
