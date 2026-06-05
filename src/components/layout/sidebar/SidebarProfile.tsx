'use client'

import { getServerProfile } from '@/services/profile/profile-server.service'
import Image from 'next/image'

interface Props {
	profile: Awaited<ReturnType<typeof getServerProfile>>
}

export function SidebarProfile({ profile }: Props) {
	if (!profile) {
		return null
	}

	return (
		<div className='mb-8 flex items-center gap-2'>
			{profile.avatar_path ? (
				<Image
					src={profile.avatar_path}
					alt={`${profile.name || 'User'} avatar`}
					width={36}
					height={36}
					className='shrink-0 rounded-full'
					draggable={false}
				/>
			) : (
				<div
					className='bg-primary h-8 w-8 shrink-0 rounded-full'
					aria-hidden='true'
				/>
			)}

			<div className='leading-snug'>
				<div className='font-medium'>{profile.name}</div>
				<div className='text-xs font-medium opacity-60'>{profile.email}</div>
			</div>
		</div>
	)
}
