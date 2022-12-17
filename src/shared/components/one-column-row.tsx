/* eslint-disable @typescript-eslint/ban-ts-comment */
interface IOneColumnRowProps {
	children: React.ReactNode
	maxWidth?: string
	minWidth?: string
}

export const OneColumnRow = ({ children, maxWidth = '100%', minWidth = '240px' }: IOneColumnRowProps) => {
	return <div style={{ maxWidth, minWidth }}>{children}</div>
}
