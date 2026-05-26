import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { AuthForm } from '../AuthForm'

export const metadata: Metadata = {
	title: 'Login',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <AuthForm type='login' />
}
