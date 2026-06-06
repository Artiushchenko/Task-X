import { z } from 'zod'

export const ProfileSchema = z.object({
	name: z.string().optional(),
	avatar_path: z.string().optional()
})
