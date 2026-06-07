import { z } from 'zod'

export const ProfileSchema = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	avatar_path: z.string().optional()
})
