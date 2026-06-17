import type { Database } from './db.types'

export type TRole = Database['public']['Enums']['user_role']

export interface IPermission {
	canManageTeam: boolean
	canManageProjects: boolean
	canViewInsights: boolean
	canDeleteProjects: boolean
	canDeleteTasks: boolean
	canManageRoles: boolean
	canManageAdminSide: boolean
}

export const ROLE_PERMISSIONS: Record<TRole, IPermission> = {
	owner: {
		canManageTeam: true,
		canManageProjects: true,
		canViewInsights: true,
		canDeleteProjects: true,
		canDeleteTasks: true,
		canManageRoles: true,
		canManageAdminSide: true
	},
	admin: {
		canManageTeam: true,
		canManageProjects: true,
		canViewInsights: true,
		canDeleteProjects: true,
		canDeleteTasks: true,
		canManageRoles: false,
		canManageAdminSide: false
	},
	member: {
		canManageTeam: false,
		canManageProjects: true,
		canViewInsights: false,
		canDeleteProjects: false,
		canDeleteTasks: false,
		canManageRoles: false,
		canManageAdminSide: false
	}
} as const

export function hasPermission(
	role: TRole,
	permission: keyof IPermission
): boolean {
	return ROLE_PERMISSIONS[role][permission]
}
