import z from 'zod'

export const ProjectSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z
		.string()
		.min(1, 'Slug is required')
		.regex(
			/^[a-z0-9-]+$/,
			'Slug can only contain lowercase letters, numbers and hyphens'
		),
	color: z.string().nullable()
})
