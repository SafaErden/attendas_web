import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { UserProps } from './users'

export const Users: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<UserProps>>> & {
	readonly _result: NamedExoticComponent<UserProps>
} = lazy(() => import(/* webpackChunkName: 'Users' */ '.'))
