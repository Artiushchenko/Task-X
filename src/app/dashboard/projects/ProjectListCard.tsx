import { ExternalLink } from '@/components/animate-ui/icons/external-link'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Trash2 } from '@/components/animate-ui/icons/trash-2'
import PermissionGuard from '@/components/guards/PermissionGuard'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DashboardPages } from '@/config/dashboard-pages'
import { useProjectDelete } from '@/hooks/project/useProjectDelete'
import type { TProject } from '@/types/project/project.types'
import type { TRole } from '@/types/role.types'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
	project: TProject
	userRole: TRole | null
}

export function ProjectListCard({ project, userRole }: Props) {
	const { isDeleting, deleteProject } = useProjectDelete()
	const router = useRouter()

	const taskCount = useMemo(() => project.tasks?.length ?? 0, [project.tasks])

	return (
		<div className='group hover:border-primary rounded-xl border p-6 transition-all hover:shadow-md'>
			<div className='mb-4 flex items-start justify-between'>
				<div className='flex items-start gap-3'>
					<div
						className='mt-2 h-3 w-3 rounded-full'
						style={{
							backgroundColor: project.color || 'transparent'
						}}
					/>

					<div>
						<h2 className='text-lg font-semibold'>{project.name}</h2>

						<p className='text-muted-foreground text-sm'>{project.slug}</p>
					</div>
				</div>

				<Link href={DashboardPages.PROJECT_DETAILS(project.slug)}>
					<Button
						variant='ghost'
						size='icon'
						className='opacity-0 transition-opacity group-hover:opacity-100'
					>
						<AnimateIcon animateOnHover>
							<ExternalLink className='h-4 w-4' />
						</AnimateIcon>
					</Button>
				</Link>
			</div>

			<div className='mb-4'>
				<p className='text-muted-foreground text-sm'>
					{taskCount} task{taskCount !== 1 ? 's' : ''}
				</p>
			</div>

			<div className='flex gap-2'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => router.push(DashboardPages.PROJECT_EDIT(project.id))}
					className='flex-1'
				>
					<Edit className='mr-2 h-4 w-4' />
					Edit
				</Button>

				<PermissionGuard
					userRole={userRole}
					permission='canDeleteProjects'
				>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<AnimateIcon animateOnHover>
								<Button
									variant='outline'
									size='sm'
									disabled={isDeleting}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</AnimateIcon>
						</AlertDialogTrigger>

						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Delete "{project.name}"?</AlertDialogTitle>

								<AlertDialogDescription>
									This will permanently delete the project und all its tasks.
									This action cannot be undone
								</AlertDialogDescription>
							</AlertDialogHeader>

							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>

								<AlertDialogAction
									onClick={() => deleteProject(project.id)}
									className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</PermissionGuard>
			</div>
		</div>
	)
}
