import { ICON_NAMES } from '@/utils/icon-map'
import { z } from 'zod'

export const TaskSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	due_date: z.date().refine(date => date.getTime() > Date.now(), {
		message: 'Due date must be in the future'
	}),
	icon: z.enum(ICON_NAMES, {
		message: 'Invalid icon selected'
	}),
	project_id: z.string().optional(),
	participants: z.array(z.string().trim().guid()).optional()
})
