import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { CapzoneIdProps } from '../capzoneIds'

export const CapzoneIdDetails: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<CapzoneIdProps>>> & {
	readonly _result: NamedExoticComponent<CapzoneIdProps>
} = lazy(() => import(/* webpackChunkName: 'CapzoneId Details' */ '.'))
