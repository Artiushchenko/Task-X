import { createClient } from '@/utils/supabase/client'

export async function signInWithEmail({ email }: { email: string }) {
	return await createClient().auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: true
		}
	})
}
