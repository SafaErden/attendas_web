/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICapzoneId, IQuestion } from '@src/pages/CapzoneIds/capzoneIds'
import { IFund } from '@src/pages/Funds/funds'
import { IInvestor } from '@src/pages/Investors/investors'
import { IAsset, IQOZB } from '@src/pages/QOZBS/qozbs'
import { ReactNode } from 'react'

export interface IColumn<T> {
	title: ReactNode
	dataKey?: keyof T
	render?: (row: T) => ReactNode
}

export interface IOption<T = string> {
	id: T
	name: string
	order?: number
	version?: number
	active?: boolean
	value?: any
	text?: string
	question?: IQuestion
}

export interface IRelationValue<T = string | boolean> {
	recommendation: string
	additionalNotes: string
	value: T
	id?: string | number
}

export type IStateName = 'users' | 'funds' | 'qozbs' | 'investors' | 'capzoneIds' | 'assets'
export type ITableRow = IQOZB | IFund | IAsset | ICapzoneId | IInvestor
