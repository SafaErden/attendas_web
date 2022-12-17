import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { ICapzoneIdRelationsProps } from '../capzone-id-details/capzoneId-details-relations'

export const InvestorRelationShip: ExoticComponent<
	ComponentPropsWithRef<NamedExoticComponent<ICapzoneIdRelationsProps>>
> & {
	readonly _result: NamedExoticComponent<ICapzoneIdRelationsProps>
} = lazy(() => import(/* webpackChunkName: 'InvestorRelatiobShip' */ '.'))
