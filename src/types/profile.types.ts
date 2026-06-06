import type { getServerProfile } from '@/services/profile/profile-server.service'
import type { Database } from './db.types'

export interface IProfile {
	id: string
	name: string
	email: string
	avatarPath?: string
}

export type TUpdateProfile = Database['public']['Tables']['profiles']['Update']

export type TProfileResponse = Awaited<ReturnType<typeof getServerProfile>>
