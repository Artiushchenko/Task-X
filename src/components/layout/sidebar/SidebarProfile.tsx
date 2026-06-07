'use client'

import type { TProfileResponse } from '@/types/profile.types'
import Image from 'next/image'

interface Props {
	profile: TProfileResponse
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
					width={40}
					height={40}
					className='h-10! shrink-0 rounded-full object-cover'
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
