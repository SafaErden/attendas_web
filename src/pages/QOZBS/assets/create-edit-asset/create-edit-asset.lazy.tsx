import { ComponentPropsWithRef, ExoticComponent, lazy, NamedExoticComponent } from 'react'

type IAssetProps = Record<string, string>

export const CreateEditAsset: ExoticComponent<ComponentPropsWithRef<NamedExoticComponent<IAssetProps>>> & {
	readonly _result: NamedExoticComponent<IAssetProps>
} = lazy(() => import(/* webpackChunkName: 'Create Edit Asset' */ '.'))
