import { Activity } from '@/components/animate-ui/icons/activity'
import { ChartNoAxesColumn } from '@/components/animate-ui/icons/chart-no-axes-column'
import { Clock12 } from '@/components/animate-ui/icons/clock-12'
import { Layers } from '@/components/animate-ui/icons/layers'
import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard'
import { List } from '@/components/animate-ui/icons/list'
import { Settings } from '@/components/animate-ui/icons/settings'
import { UsersRound } from '@/components/animate-ui/icons/users-round'
import { DashboardPages } from '@/config/dashboard-pages'
import type { IMenuItem } from '../menu/menu.types'

export const MAIN_MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		href: DashboardPages.DASHBOARD
	},
	{
		icon: Layers,
		label: 'Projects',
		href: DashboardPages.PROJECTS
	},
	{
		icon: List,
		label: 'Tasks',
		href: DashboardPages.TASKS
	},
	{
		icon: ChartNoAxesColumn,
		label: 'Insight',
		href: DashboardPages.INSIGHT
	},
	{
		icon: UsersRound,
		label: 'Team',
		href: DashboardPages.TEAM
	},
	{
		icon: Clock12,
		label: 'Schedule',
		href: DashboardPages.SCHEDULE
	},
	{
		icon: Activity,
		label: 'Activities',
		href: DashboardPages.ACTIVITIES
	},
	{
		icon: Settings,
		label: 'Settings',
		href: DashboardPages.SETTINGS
	}
]
