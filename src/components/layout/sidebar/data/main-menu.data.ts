import { Activity } from '@/components/animate-ui/icons/activity'
import { ChartNoAxesColumn } from '@/components/animate-ui/icons/chart-no-axes-column'
import { Layers } from '@/components/animate-ui/icons/layers'
import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard'
import { Settings } from '@/components/animate-ui/icons/settings'
import { UsersRound } from '@/components/animate-ui/icons/users-round'
import { DashboardPages } from '@/config/dashboard-pages'
import { CalendarDays } from 'lucide-react'
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
		icon: CalendarDays,
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
