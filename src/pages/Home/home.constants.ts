import {
	CurrencyDollarIcon,
	HomeIcon,
	OfficeBuildingIcon,
	UserGroupIcon,
	TagIcon,
	ChartPieIcon,
	ClipboardListIcon,
	UserCircleIcon,
	AcademicCapIcon,
	ChartSquareBarIcon,
} from '@heroicons/react/outline'
import { MAIN_ROUTES } from '../../shared/route.enums'
import { IRoute } from './home'

export const navigation: IRoute[] = [
	{ name: 'Home', permissionName: 'home', href: MAIN_ROUTES.HOME, icon: HomeIcon, isDisabled: true },
	{ name: 'Investors', permissionName: 'investors', href: MAIN_ROUTES.INVESTORS, icon: UserGroupIcon },
	{ name: 'Funds', permissionName: 'funds', href: MAIN_ROUTES.FUNDS, icon: CurrencyDollarIcon },
	{ name: 'QOZBs', permissionName: 'qozbs', href: MAIN_ROUTES.QOZBS, icon: OfficeBuildingIcon },
	{
		name: 'CapZone IDs',
		permissionName: 'capzoneIds',
		routeName: 'capzone',
		href: MAIN_ROUTES.CAPZONE_IDS,
		icon: TagIcon,
	},
	{ name: 'Tasks', permissionName: 'tasks', href: MAIN_ROUTES.TASKS, icon: ClipboardListIcon, isDisabled: true },
	{ name: 'Users', permissionName: 'users', href: MAIN_ROUTES.USERS, icon: UserCircleIcon },
	{
		name: 'Analytics',
		permissionName: 'analytics',
		href: MAIN_ROUTES.ANALYTICS,
		icon: ChartSquareBarIcon,
		isDisabled: true,
	},
	{ name: 'Reports', permissionName: 'reports', href: MAIN_ROUTES.REPORTS, icon: ChartPieIcon, isDisabled: true },
	{
		name: 'Knowledge Base',
		permissionName: 'knowledgeBase',
		href: MAIN_ROUTES.KNOWLEDGE_BASE,
		icon: AcademicCapIcon,
		isDisabled: true,
	},
]
