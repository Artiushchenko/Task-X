import type { ISearchItem } from '@/types/search.types'
import { ICON_MAP } from '@/utils/icon-map'
import { useCallback } from 'react'

interface Props {
	item: ISearchItem
}

export function SearchItem({ item }: Props) {
	const getIcon = useCallback(() => {
		switch (item.type) {
			case 'tasks':
				return item.icon
			case 'projects':
				return 'Folder'
			default:
				return null
		}
	}, [item.type, item.icon])

	const Icon = ICON_MAP[getIcon() as keyof typeof ICON_MAP]

	return (
		<div className='flex items-center gap-2.5'>
			<div>{Icon && <Icon />}</div>

			<div>
				<div className='font-medium'>{item.title}</div>

				{item.subTitle && (
					<span className='text-muted-foreground text-xs'>{item.subTitle}</span>
				)}
			</div>
		</div>
	)
}
