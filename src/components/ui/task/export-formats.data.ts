import {
	FileCode,
	FileImage,
	FileJson,
	FileText,
	type LucideIcon
} from 'lucide-react'

export type TExportFormat = 'markdown' | 'json' | 'text' | 'pdf'

interface IFormat {
	value: TExportFormat
	label: string
	icon: LucideIcon
}

export const EXPORT_FORMATS: IFormat[] = [
	{
		value: 'markdown',
		label: 'Markdown',
		icon: FileText
	},
	{
		value: 'json',
		label: 'JSON',
		icon: FileJson
	},
	{
		value: 'text',
		label: 'Plain Text',
		icon: FileCode
	},
	{
		value: 'pdf',
		label: 'PDF',
		icon: FileImage
	}
]
