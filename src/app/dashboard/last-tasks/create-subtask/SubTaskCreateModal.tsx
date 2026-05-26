import { observer } from 'mobx-react-lite'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { taskStore } from '@/stores/task.store'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
	taskId: string
}

export const SubTaskCreateModal = observer(({ taskId }: Props) => {
	// TODO: Implement main modal component

	const [title, setTitle] = useState('')
	const [isOpenModal, setIsOpenModal] = useState(false)

	const handleAdd = () => {
		if (!title.trim()) {
			toast.error('Title cannot be empty', {
				id: 'subtask-empty-title'
			})

			return
		}

		taskStore.addSubTask(taskId, { title })

		toast.success('Subtask created successfully')

		setTitle('')
		setIsOpenModal(false)
	}

	return (
		<Dialog
			open={isOpenModal}
			onOpenChange={setIsOpenModal}
		>
			<DialogTrigger className='bg-primary hover:bg-primary/90 rounded-full p-2 text-white transition-colors dark:text-neutral-800'>
				<Plus size={18} />
			</DialogTrigger>
			<DialogContent className='max-w-sm!'>
				<DialogHeader>
					<DialogTitle className='mb-4'>Create subtask</DialogTitle>
					<DialogDescription>
						<Input
							placeholder='Title'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='mb-4'
						/>

						<Button onClick={handleAdd}>Create</Button>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
})
