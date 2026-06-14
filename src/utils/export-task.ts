import type { TTask } from '@/types/task.types'
import jsPDF from 'jspdf'
import { generateSlug } from './generate-slug'

function getGeneralData(task: TTask) {
	const completed =
		task.subtasks?.filter(subTask => subTask.is_completed).length || 0
	const total = task.subtasks?.length || 0
	const progress = completed === 0 ? 0 : Math.round((completed / total) * 100)

	return {
		completed,
		total,
		progress
	}
}

export function exportTaskToMarkdown(task: TTask): string {
	const { completed, total, progress } = getGeneralData(task)

	return `# ${task.title}

## Details
- **Due Date**: ${new Date(task.due_date).toLocaleDateString()}
${task.start_time ? `- **Start Time**: ${task.start_time}` : ''}
${task.start_time ? `- **End Time**: ${task.end_time}` : ''}
- **Progress**: ${progress}% (${completed}/${total} subtasks completed)

## Subtasks
${task.subtasks.length ? task.subtasks.map(subTask => `- [${subTask.is_completed ? 'x' : ' '}] ${subTask.title}`).join('\n') : 'No subtasks available'}

---
*Exported from Task X*
${new Date().toLocaleString()}
`
}

export function exportTaskToJSON(task: TTask): string {
	const { completed, total, progress } = getGeneralData(task)

	return JSON.stringify(
		{
			title: task.title,
			completed_subtasks: completed,
			total_subtasks: total,
			progress_percentage: progress + '%',
			due_date: task.due_date,
			start_time: task.start_time,
			end_time: task.end_time,
			icon: task.icon,
			color: task.color,
			subtasks: task.subtasks?.map(subTask => ({
				title: subTask.title,
				is_completed: subTask.is_completed
			})),
			exported_at: new Date().toISOString()
		},
		null,
		2
	)
}

export function exportTaskToText(task: TTask): string {
	const { completed, total, progress } = getGeneralData(task)

	return `TASK: ${task.title}

DUE DATE: ${new Date(task.due_date).toLocaleDateString()}
${task.start_time ? `START TIME: ${task.start_time}` : ''}
${task.start_time ? `END TIME: ${task.end_time}` : ''}
PROGRESS: ${progress}% (${completed}/${total} subtasks completed)

SUBTASKS:
${task.subtasks.length ? task.subtasks.map(subTask => `- [${subTask.is_completed ? 'x' : ' '}] ${subTask.title}`).join('\n') : 'No subtasks available'}

---
Exported from Task X
${new Date().toLocaleString()}
`
}

export function exportTaskToPDF(task: TTask) {
	const doc = new jsPDF()

	const pageWidth = doc.internal.pageSize.getWidth()
	const pageHeight = doc.internal.pageSize.getHeight()
	const margin = 20
	const maxWidth = pageWidth - margin * 2
	let yPosition = 20

	/* HEADER */
	doc.setFontSize(20)
	doc.setFont('helvetica', 'bold')
	doc.text(task.title, 20, yPosition)
	yPosition += 15

	/* SEPARATOR */
	doc.setDrawColor(200, 200, 200)
	doc.line(20, yPosition, pageWidth - 20, yPosition)
	yPosition += 10

	/* DETAILS */
	doc.setFontSize(12)
	doc.setFont('helvetica', 'normal')

	const dueDate = new Date(task.due_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
	doc.text(`Due Date: ${dueDate}`, 20, yPosition)
	yPosition += 8

	if (task.start_time) {
		doc.text(`Start Time: ${task.start_time}`, 20, yPosition)
		yPosition += 8
	}

	if (task.end_time) {
		doc.text(`End Time: ${task.end_time}`, 20, yPosition)
		yPosition += 8
	}

	const { completed, total, progress } = getGeneralData(task)

	doc.text(
		`Progress: ${progress}% (${completed}/${total} subtasks)`,
		20,
		yPosition
	)
	yPosition += 15

	/* SUBTASKS */
	if (task.subtasks && task.subtasks.length > 0) {
		doc.setFont('helvetica', 'bold')
		doc.text('Subtasks:', 20, yPosition)
		yPosition += 8

		doc.setFont('helvetica', 'normal')
		task.subtasks.forEach(subTask => {
			const checkBox = subTask.is_completed ? '[x]' : '[ ]'
			const text = `${checkBox} ${subTask.title}`

			if (yPosition > pageHeight - 30) {
				doc.addPage()
				yPosition = 20
			}

			const textLines = doc.splitTextToSize(text, maxWidth - 10)
			doc.text(textLines, margin + 5, yPosition)
			yPosition += textLines.length * 7
		})
	} else {
		doc.setFont('helvetica', 'italic')
		doc.text('No subtasks', 20, yPosition)
	}

	/* FOOTER */
	yPosition = doc.internal.pageSize.getHeight() - 20
	doc.setFontSize(8)
	doc.setFont('helvetica', 'italic')
	doc.setTextColor(150, 150, 150)
	doc.text(
		`Exported from Task X on ${new Date().toLocaleString()}`,
		20,
		yPosition
	)

	const fileName = generateFileName(task.title, 'pdf')

	doc.save(fileName)
}

export function downloadFile(
	content: string,
	fileName: string,
	fileType: string
) {
	const blob = new Blob([content], { type: fileType })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')

	link.href = url
	link.download = fileName

	document.body.appendChild(link)

	link.click()

	document.body.removeChild(link)

	URL.revokeObjectURL(url)
}

export function generateFileName(title: string, extension: string): string {
	const slug = generateSlug(title)

	return `task-${slug}.${extension}`
}
