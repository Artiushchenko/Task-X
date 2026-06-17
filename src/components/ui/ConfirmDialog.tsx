'use client'

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
import { AnimateIcon } from '../animate-ui/icons/icon'
import { Trash2 } from '../animate-ui/icons/trash-2'
import { Button } from './button'

interface Props {
	title: string
	description: string
	onConfirm: () => void
	isDeleting: boolean
	isTask?: boolean
}

export function ConfirmDialog({
	title,
	description,
	onConfirm,
	isDeleting,
	isTask
}: Props) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<AnimateIcon animateOnHover>
					{isTask ? (
						<button
							disabled={isDeleting}
							className='bg-card inline-flex items-center justify-center rounded-full border border-red-400 p-2 text-red-400 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white'
						>
							<Trash2 size={18} />
						</button>
					) : (
						<Button
							variant='outline'
							size='sm'
							disabled={isDeleting}
						>
							<Trash2 className='h-4 w-4' />
						</Button>
					)}
				</AnimateIcon>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete "{title}"?</AlertDialogTitle>

					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>

					<AlertDialogAction
						onClick={onConfirm}
						className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
