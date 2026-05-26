import { DashboardPages } from '@/config/dashboard-pages'
import {
	CalendarDays,
	ChartNoAxesColumn,
	LayoutGrid,
	MessageCircleMore,
	NotebookText,
	Settings,
	UsersRound
} from 'lucide-react'
import type { IMenuItem } from '../menu/menu.types'

export const MAIN_MENU: IMenuItem[] = [
	{
		icon: LayoutGrid,
		label: 'Dashboard',
		href: DashboardPages.DASHBOARD
	},
	{
		icon: MessageCircleMore,
		label: 'Messages',
		href: DashboardPages.MESSAGES
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
		icon: NotebookText,
		label: 'Report',
		href: DashboardPages.REPORT
	},
	{
		icon: Settings,
		label: 'Settings',
		href: DashboardPages.SETTINGS
	}
]
