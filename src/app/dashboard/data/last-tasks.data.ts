import type { ITask } from '@/types/task.types'
import { Plane, ShoppingBasket, TabletSmartphone } from 'lucide-react'
import { USERS } from './users.data'

export const TASKS: ITask[] = [
	{
		id: '1',
		title: 'Travel App User Flow',
		icon: Plane,
		dueDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
		comments: ['Comment 1', 'Comment 2', 'Comment 3'],
		resources: ['', '', '', '', '', ''],
		links: ['https://example.com/link1', 'https://example.com/link2'],
		users: [USERS[0], USERS[1], USERS[2]],
		subTasks: [
			{
				id: '1',
				title: 'Design user flow',
				isCompleted: true
			},
			{
				id: '2',
				title: 'Implement user flow',
				isCompleted: true
			},
			{
				id: '3',
				title: 'Test user flow',
				isCompleted: false
			},
			{
				id: '4',
				title: 'Deploy user flow',
				isCompleted: false
			}
		]
	},
	{
		id: '2',
		title: 'E-commerce Website Redesign',
		icon: ShoppingBasket,
		dueDate: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
		comments: ['Initial design review', 'Feedback received'],
		resources: ['', '', '', '', ''],
		links: ['https://example.com/link3', 'https://example.com/link4'],
		users: [USERS[3], USERS[4], USERS[5]],
		subTasks: [
			{
				id: '1',
				title: 'Create new design mockups',
				isCompleted: true
			}
		]
	},
	{
		id: '3',
		title: 'Mobile App Feature Update',
		icon: TabletSmartphone,
		dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
		comments: ['Feature requirements defined'],
		resources: ['', '', '', ''],
		links: ['https://example.com/link5'],
		users: [USERS[6], USERS[7], USERS[8]],
		subTasks: [
			{
				id: '1',
				title: 'Implement new feature',
				isCompleted: true
			},
			{
				id: '2',
				title: 'Conduct user testing',
				isCompleted: true
			},
			{
				id: '3',
				title: 'Prepare release notes',
				isCompleted: true
			},
			{
				id: '4',
				title: 'Deploy to production',
				isCompleted: true
			},
			{
				id: '5',
				title: 'Monitor post-release performance',
				isCompleted: false
			}
		]
	}
]
