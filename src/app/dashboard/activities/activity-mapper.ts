import type {
	IActivityItem,
	TActivityType,
	TServerUserEntitiesResponse
} from '@/types/activity.types'

export class ActivityMapper {
	static fromTask(
		task: TServerUserEntitiesResponse['tasks'][0],
		type: TActivityType = 'TASK_CREATED'
	): IActivityItem {
		return {
			id: `${type}-${task.id}`,
			type,
			title: task.title,
			createdAt: task.created_at || undefined
		}
	}

	static fromProject(
		project: TServerUserEntitiesResponse['projects'][0]
	): IActivityItem {
		return {
			id: `project-created-${project.id}`,
			type: 'PROJECT_CREATED',
			title: project.name,
			createdAt: project.created_at || undefined
		}
	}

	static isTaskCompleted(
		task: TServerUserEntitiesResponse['tasks'][0]
	): boolean {
		return (
			task.subtasks.length > 0 &&
			task.subtasks.every(subTask => subTask.is_completed)
		)
	}
}
