import { hasPermission, type IPermission, type TRole } from '@/types/role.types'
import type { PropsWithChildren } from 'react'

interface Props {
	userRole: TRole | null
	permission: keyof IPermission
	fallback?: React.ReactNode
}

export default function PermissionGuard({
	children,
	userRole,
	permission,
	fallback
}: PropsWithChildren<Props>) {
	if (!userRole || !hasPermission(userRole, permission)) {
		return <>{fallback || null}</>
	}

	return <>{children}</>
}
