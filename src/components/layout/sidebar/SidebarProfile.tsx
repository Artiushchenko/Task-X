'use client'

import { getServerProfile } from '@/services/profile/profile-server.service'
import Image from 'next/image'

export function SidebarProfile({
	data
}: {
	data: Awaited<ReturnType<typeof getServerProfile>>
}) {
	if (!data) {
		return null
	}

	return (
		<div className='mb-8 flex items-center gap-2'>
			{data.avatar_path ? (
				<Image
					src={data.avatar_path}
					alt={data.name || 'User avatar'}
					width={36}
					height={36}
					className='shrink-0 rounded-full'
				/>
			) : (
				<div className='bg-primary h-8 w-8 shrink-0 rounded-full' />
			)}

			<div className='leading-snug'>
				<div className='font-medium'>{data.name}</div>
				<div className='text-xs font-medium opacity-60'>{data.email}</div>
			</div>
		</div>
	)
}
