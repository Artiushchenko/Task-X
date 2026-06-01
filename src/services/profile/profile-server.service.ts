'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProfile() {
	const client = await createClientFromServer()

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
