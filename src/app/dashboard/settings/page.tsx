import { getServerProfile } from '@/services/profile/profile-server.service'
import type { Metadata } from 'next'
import { Settings } from './Settings'

export const metadata: Metadata = {
	title: 'Settings'
}

export default async function Page() {
	const profile = await getServerProfile()

	return <Settings profile={profile} />
}
