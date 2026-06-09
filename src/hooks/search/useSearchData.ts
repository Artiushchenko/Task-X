import { getProjects } from '@/services/projects/project-client.service'
import { getClientTasks } from '@/services/tasks/task-client.service'
import type { ISearchData } from '@/types/search.types'
import { useQuery } from '@tanstack/react-query'

export function useSearchData() {
	return useQuery<ISearchData>({
		queryKey: ['search-data'],
		queryFn: async () => {
			const [tasks, projects] = await Promise.all([
				getClientTasks({}),
				getProjects()
			])

			return {
				tasks,
				projects
			}
		},
		staleTime: 1000 * 60 * 5
	})
}
