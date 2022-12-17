import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { QozbProps } from '../qozbs'

export const CreateEditQozb: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<QozbProps>>> & {
	readonly _result: NamedExoticComponent<QozbProps>
} = lazy(() => import(/* webpackChunkName: 'Qozb' */ '.'))
