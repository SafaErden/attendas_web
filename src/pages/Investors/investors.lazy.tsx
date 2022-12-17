import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { InvestorProps } from './investors'

export const Investors: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<InvestorProps>>> & {
	readonly _result: NamedExoticComponent<InvestorProps>
} = lazy(() => import(/* webpackChunkName: 'Investors' */ '.'))
