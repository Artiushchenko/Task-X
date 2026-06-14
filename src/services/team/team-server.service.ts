import type { TProfileResponse } from '@/types/profile.types'
import type { TRole } from '@/types/role.types'
import { getServerAuth } from '@/utils/supabase/get-server-auth'
import { createClientFromServer } from '@/utils/supabase/server'

export interface ITeamMember extends Pick<
	TProfileResponse,
	'id' | 'name' | 'avatar_path'
> {
	projectCount: number
	role: TRole
}

export async function getServerTeamMembers() {
	const client = await createClientFromServer()
	const user = await getServerAuth()

	if (!user) {
		return {
			members: [],
			currentUserId: null
		}
	}

	const { data: profiles } = await client
		.from('profiles')
		.select('id, name, avatar_path, role')

	if (!profiles) {
		return {
			members: [],
			currentUserId: null
		}
	}

	const { data: projects } = await client.from('projects').select(`
			id,
			owner_id,
			project_participants(profile_id)	
		`)

	const projectsCount = new Map<string, number>()

	for (const project of projects || []) {
		const ownerId = project.owner_id

		if (ownerId) {
			projectsCount.set(ownerId, (projectsCount.get(ownerId) || 0) + 1)
		}

		for (const participant of project.project_participants || []) {
			const profileId = participant.profile_id

			if (profileId) {
				projectsCount.set(profileId, (projectsCount.get(profileId) || 0) + 1)
			}
		}
	}

	const members: ITeamMember[] = profiles.map(profile => ({
		...profile,
		role: profile.role as TRole,
		projectCount: projectsCount.get(profile.id) || 0
	}))

	const roleOrder = {
		owner: 0,
		admin: 1,
		member: 2
	}

	members.sort((a, b) => roleOrder[a.role] - roleOrder[b.role])

	return {
		members,
		currentUserId: user.id
	}
}
