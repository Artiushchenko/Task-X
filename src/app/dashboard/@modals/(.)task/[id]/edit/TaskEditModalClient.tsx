'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
	id: string
}

export function TaskEditModalClient({ id }: Props) {
	const router = useRouter()

	const closeModal = () => {
		router.back()
	}

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal()
			}
		}

		document.addEventListener('keydown', handleEscape)

		return () => document.removeEventListener('keydown', handleEscape)
	}, [])

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
			onClick={closeModal}
		>
			<div
				className='mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800'
				onClick={e => e.stopPropagation()}
			>
				<div className='mb-6 flex items-center justify-between'>
					<h2 className='text-xl font-bold'>Edit Task {id}</h2>

					<button onClick={closeModal}>×</button>
				</div>
			</div>
		</div>
	)
}
