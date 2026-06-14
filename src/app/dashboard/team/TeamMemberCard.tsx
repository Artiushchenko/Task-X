import type { ITeamMember } from '@/services/team/team-server.service'
import { User } from 'lucide-react'
import Image from 'next/image'
import { ROLE_CONFIG } from './role-config'

interface Props {
	member: ITeamMember
	isCurrentUser: boolean
}

export function TeamMemberCard({ member, isCurrentUser }: Props) {
	const roleConfig = ROLE_CONFIG[member.role]
	const RoleIcon = roleConfig.icon

	return (
		<div className='rounded-xl border p-6 transition-all hover:shadow-md'>
			<div className='mb-4 flex flex-col items-center'>
				<div className='relative mb-3'>
					{member.avatar_path ? (
						<Image
							src={member.avatar_path}
							alt={member.name || 'Team member'}
							width={80}
							height={80}
							className='h-20! rounded-full object-cover'
							unoptimized
						/>
					) : (
						<div className='bg-muted flex h-20 w-20 items-center justify-center rounded-full'>
							<User className='text-muted-foreground h-10 w-10' />
						</div>
					)}

					<div
						className={`absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full ${roleConfig.bgColor}`}
					>
						<RoleIcon className={`h-4 w-4 ${roleConfig.iconColor}`} />
					</div>
				</div>

				<h3 className='text-center font-semibold'>
					{member.name || 'Unknown user'}
					{isCurrentUser && (
						<span className='text-muted-foreground ml-2 text-xs'>(You)</span>
					)}
				</h3>

				<div
					className={`mt-1 rounded-full px-3 py-1 text-xs font-medium ${roleConfig.bgColor} ${roleConfig.color}`}
				>
					{roleConfig.label}
				</div>
			</div>

			<div className='border-t pt-4 text-center'>
				<p className='text-muted-foreground text-sm'>
					<strong className='text-foreground font-medium'>
						{member.projectCount}
					</strong>{' '}
					project{member.projectCount !== 1 ? 's' : ''}
				</p>
			</div>
		</div>
	)
}
