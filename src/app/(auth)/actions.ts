'use server'

import { createClientFromServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signInWithEmail({ email }: { email: string }) {
	const supabase = await createClientFromServer()

	const { data, error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			shouldCreateUser: true,
			emailRedirectTo: 'http://localhost:3000'
		}
	})

	if (error) {
		redirect('/error')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}
