import { PublicPages } from '@/config/public-pages'
import { redirect } from 'next/navigation'
import { createClientFromServer } from './server'

export async function getServerAuth(isNeedRedirect = false) {
	const supabase = await createClientFromServer()
	const { data, error } = await supabase.auth.getUser()

	if (error || !data?.user) {
		return isNeedRedirect ? redirect(PublicPages.LOGIN) : null
	}

	return data.user
}
