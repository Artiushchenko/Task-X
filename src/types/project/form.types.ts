import type { ProjectSchema } from '@/zod-schemes/project.zod'
import type z from 'zod'

export type TFormProject = z.infer<typeof ProjectSchema>
