'use client'

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
