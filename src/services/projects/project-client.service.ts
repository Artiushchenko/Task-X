import type {
	TProjectInsert,
	TProjectUpdate
} from '@/types/project/project.types'
import { createClient } from '@/utils/supabase/client'

export async function getProjects() {
	const { data, error } = await createClient()
		.from('projects')
		.select(`*, tasks(id)`)
		.order('created_at', {
			ascending: true
		})

	if (error || !data) {
		throw new Error(error.message || 'Failed to get projects')
	}

	return data
}

export async function getProjectById(id?: string) {
	if (!id) {
		throw new Error('Project ID is required')
	}

	const { data, error } = await createClient()
		.from('projects')
		.select(`*`)
		.eq('id', id)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to get project by id')
	}

	return data
}

export async function projectCreate(data: TProjectInsert) {
	const { data: project, error } = await createClient()
		.from('projects')
		.insert(data)
		.select()
		.single()

	if (error || !project) {
		throw new Error(error?.message || 'Failed to create project')
	}

	return project
}

export async function projectUpdate(id: string, data: TProjectUpdate) {
	const { error } = await createClient()
		.from('projects')
		.update(data)
		.eq('id', id)

	if (error) {
		throw new Error(error.message || 'Failed to update project')
	}

	return true
}

export async function projectDelete(id: string) {
	const { error } = await createClient().from('projects').delete().eq('id', id)

	if (error) {
		throw new Error(error.message || 'Failed to delete project')
	}

	return true
}
