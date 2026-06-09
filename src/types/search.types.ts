import type { Tables } from './db.types'

export type TSearchResult = 'tasks' | 'projects'

export interface ISearchItem {
	id: string
	type: TSearchResult
	title: string
	subTitle?: string
	icon?: string
	color?: string
	href: string
	metadata?: {
		[key: string]: string | number
	}
}

export interface ISearchData {
	tasks: Tables<'tasks'>[]
	projects: Tables<'projects'>[]
}
