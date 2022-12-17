import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { CapzoneIdProps } from './capzoneIds'

export const CapzoneIds: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<CapzoneIdProps>>> & {
	readonly _result: NamedExoticComponent<CapzoneIdProps>
} = lazy(() => import(/* webpackChunkName: 'CapzoneIds' */ '.'))
