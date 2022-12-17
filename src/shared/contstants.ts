export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'

export const DAEMON = '@@saga-injector/daemon'

export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'

export const FIRST_ROW_CLASS_NAME = 'firstRow'

export const menuPermissions: Record<string, string[]> = {
	Admin: ['all'],
	Senior: ['funds', 'qozbs', 'investors', 'capzoneIds', 'reports', 'tasks', 'home', 'analytics', 'knowledgeBase'],
	Junior: ['funds', 'qozbs', 'investors', 'capzoneIds', 'reports', 'tasks', 'home', 'analytics', 'knowledgeBase'],
}
