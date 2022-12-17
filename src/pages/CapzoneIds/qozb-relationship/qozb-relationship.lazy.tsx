import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'
import { ICapzoneIdRelationsProps } from '../capzone-id-details/capzoneId-details-relations'

export const QOZBRelationShip: ExoticComponent<
	ComponentPropsWithRef<NamedExoticComponent<ICapzoneIdRelationsProps>>
> & {
	readonly _result: NamedExoticComponent<ICapzoneIdRelationsProps>
} = lazy(() => import(/* webpackChunkName: 'QOZBRelatiobShip' */ '.'))
