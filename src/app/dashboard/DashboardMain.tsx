'use client'

import { GlobalSearch } from '@/components/global-search/GlobalSearch'
import { useGlobalSearchDialog } from '@/hooks/search/useGlobalSearchDialog'

interface Props {
	children: React.ReactNode
}

export function DashboardMain({ children }: Props) {
	const { isOpen, setIsOpen } = useGlobalSearchDialog()

	return (
		<div className='min-h-0 overflow-auto'>
			<main>{children}</main>

			<GlobalSearch
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</div>
	)
}
