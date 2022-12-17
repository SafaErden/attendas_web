import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { FundProps } from './funds'

export const Funds: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<FundProps>>> & {
	readonly _result: NamedExoticComponent<FundProps>
} = lazy(() => import(/* webpackChunkName: 'Funds' */ '.'))
