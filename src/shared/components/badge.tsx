const badgeTypes = {
	Administrator: 'bg-indigo-100 text-indigo-800',
	'Junior Manager': 'bg-yellow-100 text-yellow-800',
	'Senior Manager': 'bg-green-100 text-green-800',
	'Not Active': 'bg-red-100 text-white-800',
	'Primary Contact': 'bg-gray-100 text-gray-700',
}

const badgeTypeNumbers: Record<number, keyof typeof badgeTypes> = {
	1: 'Administrator',
	2: 'Senior Manager',
	3: 'Junior Manager',
	4: 'Not Active',
	5: 'Primary Contact',
}

interface IBadgeProps {
	type: number
	title: string
}

export const Badge = ({ type, title }: IBadgeProps) => {
	return (
		<span
			style={{ maxWidth: '72px' }}
			className={`inline-flex justify-center items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
				badgeTypes[badgeTypeNumbers[type]]
			}`}
		>
			{title}
		</span>
	)
}
