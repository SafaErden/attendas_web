import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { InvestorProps } from '../investors'

export const CreateEditInvestor: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<InvestorProps>>> & {
	readonly _result: NamedExoticComponent<InvestorProps>
} = lazy(() => import(/* webpackChunkName: 'Create Edit Investor' */ '.'))
