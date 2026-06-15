'use client'

import { PageHeader } from '@/components/ui/PageHeader'
import type { ITeamMember } from '@/services/team/team-server.service'
import { Crown, ShieldCheck, Users, UsersIcon } from 'lucide-react'
import { useMemo } from 'react'
import { TeamMemberCard } from './TeamMemberCard'
import { TopStatisticsCard } from './TopStatisticsCard'

interface Props {
	members: ITeamMember[]
	currentUserId: string | null
}

export function Team({ members, currentUserId }: Props) {
	const data = useMemo(() => {
		const ownersCount = members.filter(member => member.role === 'owner').length
		const adminsCount = members.filter(member => member.role === 'admin').length
		const membersCount = members.filter(
			member => member.role === 'member'
		).length

		return {
			ownersCount,
			adminsCount,
			membersCount
		}
	}, [members])

	return (
		<div className='h-screen overflow-y-auto p-5'>
			<PageHeader
				title='Team'
				description='Manage your team members and roles'
			/>

			<div className='mb-6 grid grid-cols-4 gap-4'>
				<TopStatisticsCard
					title='Owners'
					value={data.ownersCount}
					icon={Crown}
					iconClassName='text-yellow-500'
				/>

				<TopStatisticsCard
					title='Admins'
					value={data.adminsCount}
					icon={ShieldCheck}
					iconClassName='text-blue-500'
				/>

				<TopStatisticsCard
					title='Members'
					value={data.membersCount}
					icon={UsersIcon}
					iconClassName='text-gray-500'
				/>

				<TopStatisticsCard
					title='Total'
					value={members.length}
					icon={Users}
					iconClassName='text-muted-foreground'
				/>
			</div>

			{members.length === 0 ? (
				<div className='flex h-64 items-center justify-center'>
					<p className='text-muted-foreground'>No team members yet</p>
				</div>
			) : (
				<div>
					<h3 className='text-muted-foreground mb-4 text-sm font-semibold'>
						Team Members ({members.length})
					</h3>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{members.map(member => (
							<TeamMemberCard
								key={member.id}
								member={member}
								isCurrentUser={member.id === currentUserId}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
