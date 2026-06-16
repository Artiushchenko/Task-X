import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

interface Props {
	title: string
	description?: string
	children: React.ReactNode
	size?: 'sm' | 'md' | 'lg'
}

export function Modal({ title, description, children, size = 'sm' }: Props) {
	const sizeMap = {
		sm: 'max-w-sm!',
		md: 'max-w-md!',
		lg: 'max-w-lg!'
	}

	return (
		<DialogContent className={`${sizeMap[size]} gap-0 overflow-hidden p-0`}>
			<div className='border-b px-6 py-4'>
				<DialogHeader className='text-left'>
					<DialogTitle className='text-xl'>{title}</DialogTitle>

					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
			</div>

			<div className='px-6 py-5'>{children}</div>
		</DialogContent>
	)
}
