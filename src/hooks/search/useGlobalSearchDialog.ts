import { isGlobalSearchOpenAtom } from '@/store/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export function useGlobalSearchDialog() {
	const [isOpen, setIsOpen] = useAtom(isGlobalSearchOpenAtom)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.repeat) return

			const isK = e.key.toLowerCase() === 'k'
			const isModifier = e.metaKey || e.ctrlKey

			if (isK && isModifier) {
				e.preventDefault()
				setIsOpen(prev => !prev)
			}
		}

		window.addEventListener('keydown', down)

		return () => window.removeEventListener('keydown', down)
	}, [setIsOpen])

	return {
		isOpen,
		setIsOpen
	}
}
