import { z } from 'zod'

export const AuthSchema = z.object({
	email: z
		.string({
			error: 'E-mail is required'
		})
		.min(1, 'E-mail is required')
		.email('Invalid e-mail address'),

	password: z
		.string({
			error: 'Password is required'
		})
		.min(6, 'Password must be at least 6 characters')
})
