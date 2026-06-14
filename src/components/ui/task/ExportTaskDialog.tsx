import { Download } from '@/components/animate-ui/icons/download'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import type { TTask } from '@/types/task.types'
import {
	downloadFile,
	exportTaskToJSON,
	exportTaskToMarkdown,
	exportTaskToPDF,
	exportTaskToText,
	generateFileName
} from '@/utils/export-task'
import { useState } from 'react'
import { toast } from 'sonner'
import { EXPORT_FORMATS, type TExportFormat } from './export-formats.data'

interface Props {
	task: TTask
}

export function ExportTaskDialog({ task }: Props) {
	// TODO: Replace to useClickOutside
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isExporting, setIsExporting] = useState(false)

	const handleExport = async (format: TExportFormat) => {
		setIsExporting(true)

		try {
			switch (format) {
				case 'markdown': {
					const content = exportTaskToMarkdown(task)
					const fileName = generateFileName(task.title, 'md')

					downloadFile(content, fileName, 'text/markdown')

					break
				}
				case 'json': {
					const content = exportTaskToJSON(task)
					const fileName = generateFileName(task.title, 'json')

					downloadFile(content, fileName, 'application/json')

					break
				}
				case 'text': {
					const content = exportTaskToText(task)
					const fileName = generateFileName(task.title, 'txt')

					downloadFile(content, fileName, 'text/plain')

					break
				}
				case 'pdf': {
					exportTaskToPDF(task)

					break
				}
				default:
					throw new Error('Unknown export format')
			}

			toast.success(`Task exported successfully (${format.toUpperCase()})`)

			setIsOpenModal(false)
		} catch (error) {
			console.error('Error exporting task:', error)

			toast.error('Failed to export task. Please try again')
		} finally {
			setIsExporting(false)
		}
	}

	return (
		<Dialog
			open={isOpenModal}
			onOpenChange={setIsOpenModal}
		>
			<DialogTrigger asChild>
				<AnimateIcon animateOnHover>
					<button
						className='border-primary text-primary hover:bg-primary/10 bg-card inline-flex items-center justify-center rounded-full border p-2 transition-colors'
						aria-label={`Export task: ${task.title}`}
					>
						<Download size={18} />
					</button>
				</AnimateIcon>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Export task</DialogTitle>

					<DialogDescription>
						Choose a format to export "{task.title}"
					</DialogDescription>
				</DialogHeader>

				<div className='grid grid-cols-2 gap-4'>
					{EXPORT_FORMATS.map(format => {
						const Icon = format.icon

						return (
							<button
								key={format.value}
								onClick={() => handleExport(format.value)}
								disabled={isExporting}
								className='hover:border-primary hover:bg-muted/50 flex items-center gap-4 rounded-lg border p-4 text-left transition-all disabled:opacity-50'
							>
								<div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg'>
									<Icon className='h-5 w-5' />
								</div>

								<div className='flex-1'>
									<h4 className='font-medium'>{format.label}</h4>
								</div>
							</button>
						)
					})}
				</div>
			</DialogContent>
		</Dialog>
	)
}
