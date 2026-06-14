import type { Database } from './db.types'

export type TRole = Database['public']['Enums']['user_role']

interface IPermission {
	canManageTeam: boolean
	canManageProjects: boolean
	canViewInsights: boolean
	canDeleteProjects: boolean
	canManageRoles: boolean
}

export const ROLE_PERMISSIONS: Record<TRole, IPermission> = {
	owner: {
		canManageTeam: true,
		canManageProjects: true,
		canViewInsights: true,
		canDeleteProjects: true,
		canManageRoles: true
	},
	admin: {
		canManageTeam: true,
		canManageProjects: true,
		canViewInsights: true,
		canDeleteProjects: true,
		canManageRoles: false
	},
	member: {
		canManageTeam: false,
		canManageProjects: true,
		canViewInsights: false,
		canDeleteProjects: false,
		canManageRoles: false
	}
} as const

export function hasPermission(
	role: TRole,
	permission: keyof IPermission
): boolean {
	return ROLE_PERMISSIONS[role][permission]
}
