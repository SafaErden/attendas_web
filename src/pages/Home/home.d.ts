/* eslint-disable @typescript-eslint/no-explicit-any */
export type HomeProps = {
	[k: string]: unknown
	in?: boolean
}

export interface IRoute {
	name: string
	href: string
	icon: any
	routeName?: string
	permissionName: string
	isDisabled?: boolean
}
