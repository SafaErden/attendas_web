import { LoginProps } from '../../pages/Login/login'
import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'

export const Login: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<LoginProps>>> & {
	readonly _result: NamedExoticComponent<LoginProps>
} = lazy(() => import(/* webpackChunkName: 'Login' */ './'))
