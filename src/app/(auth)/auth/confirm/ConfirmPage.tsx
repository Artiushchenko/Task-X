'use client'

import { DashboardPages } from '@/config/dashboard-pages'
import { PublicPages } from '@/config/public-pages'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function ConfirmPage() {
	const params = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const verifyToken = async () => {
			const tokenHash = params.get('token_hash')

			if (!tokenHash) {
				return router.replace(PublicPages.LOGIN)
			}

			const { error } = await createClient().auth.verifyOtp({
				type: 'email',
				token_hash: tokenHash
			})

			// TODO: Also create a profile for the user

			if (error) {
				return router.replace(PublicPages.LOGIN)
			}

			router.replace(DashboardPages.BASE)
		}

		verifyToken()
	}, [])

	return <p>Verifying your e-mail... Please wait</p>
}
