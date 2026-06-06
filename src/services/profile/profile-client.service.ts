'use client'

import type { TUpdateProfile } from '@/types/profile.types'
import { createClient } from '@/utils/supabase/client'

export async function getProfile() {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()

	if (authError || !user) {
		throw new Error(authError?.message || 'Failed to fetch user')
	}

	const { data, error } = await client
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single()

	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch profile')
	}

	return { ...user, ...data }
}

export async function getAllProfiles() {
	const { data, error } = await createClient().from('profiles').select('*')

	if (error || !data) {
		throw new Error(error.message || 'Profiles not found')
	}

	return data
}

export async function updateProfile(dto: TUpdateProfile) {
	if (!dto.id) {
		throw new Error('Profile ID is required for update')
	}

	const { error } = await createClient()
		.from('profiles')
		.update(dto)
		.eq('id', dto.id)

	if (error) {
		throw new Error(error?.message || 'Failed to update profile')
	}

	return true
}
