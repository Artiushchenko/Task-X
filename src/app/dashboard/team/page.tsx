import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerTeamMembers } from '@/services/team/team-server.service'
import { Team } from './Team'

export const metadata: Metadata = {
	title: 'Team',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const { members, currentUserId } = await getServerTeamMembers()

	return (
		<Team
			currentUserId={currentUserId}
			members={members}
		/>
	)
}
