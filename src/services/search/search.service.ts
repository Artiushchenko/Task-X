import { DashboardPages } from '@/config/dashboard-pages'
import type { Tables } from '@/types/db.types'
import type { ISearchData, ISearchItem } from '@/types/search.types'

export class SearchService {
	private static normalizeString(str: string): string {
		return str.trim().toLowerCase()
	}

	private static matchesQuery(text: string, query: string) {
		const normalizedText = this.normalizeString(text)
		const normalizedQuery = this.normalizeString(query)

		return normalizedText.includes(normalizedQuery)
	}

	static searchTasks(tasks: Tables<'tasks'>[], query: string): ISearchItem[] {
		return tasks
			.filter(task => this.matchesQuery(task.title, query))
			.map(task => ({
				id: task.id,
				type: 'tasks',
				title: task.title,
				icon: task.icon || undefined,
				color: task.color || undefined,
				href: DashboardPages.TASK_EDIT(task.id)
			}))
	}

	static searchProjects(
		projects: Tables<'projects'>[],
		query: string
	): ISearchItem[] {
		return projects
			.filter(project => this.matchesQuery(project.name, query))
			.map(project => ({
				id: project.id,
				type: 'projects',
				title: project.name,
				color: project.color || undefined,
				href: DashboardPages.PROJECT_DETAILS(project.slug)
			}))
	}

	static search(data: ISearchData, query: string): ISearchItem[] {
		if (!query || query.length < 2) {
			return []
		}

		const tasksResults = this.searchTasks(data.tasks, query)
		const projectsResults = this.searchProjects(data.projects, query)

		return [...tasksResults, ...projectsResults]
	}
}
