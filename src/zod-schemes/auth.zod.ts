import { z } from 'zod'

export const AuthSchema = z.object({
	email: z
		.string({
			error: 'E-mail is required'
		})
		.min(1, 'E-mail is required')
		.email('Invalid e-mail address')
})
