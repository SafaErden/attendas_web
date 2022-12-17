import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { InvestorProps } from '../investors'

export const InvestorDetails: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<InvestorProps>>> & {
	readonly _result: NamedExoticComponent<InvestorProps>
} = lazy(() => import(/* webpackChunkName: 'Investor Details' */ '.'))
