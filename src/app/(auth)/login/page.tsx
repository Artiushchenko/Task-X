import type { Metadata } from 'next'

import { DashboardPages } from '@/config/dashboard-pages'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerAuth } from '@/utils/supabase/get-server-auth'
import { redirect } from 'next/navigation'
import { AuthForm } from '../AuthForm'

export const metadata: Metadata = {
	title: 'Login',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const user = await getServerAuth()

	if (user) {
		redirect(DashboardPages.BASE)
	}

	return <AuthForm />
}
