import { ERROR_MESSAGES } from '../../../../utils/error-messages'
import { object, string } from 'yup'
import { IAsset, IAssetType } from '../../qozbs'

export const assetInitialValues = (asset: Partial<IAsset> | null, assetTypes: IAssetType[]): Partial<IAsset> => {
	return {
		assetId: asset?.assetId ?? undefined,
		assetTypeId: asset?.assetType?.assetTypeId ?? assetTypes[0]?.assetTypeId,
		assetDescription: asset?.assetDescription ?? '',
		assetName: asset?.assetName ?? '',
	}
}

export const assetValidationSchema = object({
	assetName: string().nullable().required(ERROR_MESSAGES.required('Asset Name')),
})
