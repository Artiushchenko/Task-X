import { hasPermission, type IPermission, type TRole } from '@/types/role.types'
import { cache } from 'react'
import { getServerAuth } from './get-server-auth'
import { createClientFromServer } from './server'

export const getServerUserRole = cache(async (): Promise<TRole | null> => {
	const client = await createClientFromServer()
	const user = await getServerAuth()

	if (!user) {
		return null
	}

	const { data: profile } = await client
		.from('profiles')
		.select('role')
		.eq('id', user.id)
		.single()

	return profile?.role || 'member'
})

export async function checkPermission(
	permission: keyof IPermission
): Promise<boolean> {
	const role = await getServerUserRole()

	if (!role) {
		return false
	}

	return hasPermission(role, permission)
}
