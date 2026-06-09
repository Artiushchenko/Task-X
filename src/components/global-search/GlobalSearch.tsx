import { useSearchData } from '@/hooks/search/useSearchData'
import { SearchService } from '@/services/search/search.service'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '../ui/command'
import { SkeletonLoader } from '../ui/SkeletonLoader'

interface Props {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

export function GlobalSearch({ isOpen, setIsOpen }: Props) {
	const [query, setQuery] = useState('')
	const router = useRouter()

	const { data: searchData, isLoading } = useSearchData()

	const results = useMemo(() => {
		if (!searchData || !query) {
			return []
		}

		return SearchService.search(searchData, query)
	}, [searchData, query])

	const groupedResults = useMemo(() => {
		const tasks = results.filter(r => r.type === 'tasks')
		const projects = results.filter(r => r.type === 'projects')

		return {
			tasks,
			projects
		}
	}, [results])

	const handleSelectItem = (href: string) => {
		setIsOpen(false)
		setQuery('')

		router.push(href)
	}

	return (
		<CommandDialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<CommandInput
				placeholder='Search tasks and projects...'
				value={query}
				onValueChange={setQuery}
			/>

			<CommandList>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-10 w-full'
					/>
				) : (
					<>
						<CommandEmpty>No results found</CommandEmpty>

						{groupedResults.tasks.length > 0 && (
							<>
								<CommandGroup heading='Tasks'>
									{groupedResults.tasks.map(item => (
										<CommandItem
											key={item.id}
											value={item.title}
											onSelect={() => handleSelectItem(item.href)}
										>
											{item.title}
										</CommandItem>
									))}
								</CommandGroup>

								<CommandSeparator />
							</>
						)}

						{groupedResults.projects.length > 0 && (
							<CommandGroup heading='Projects'>
								{groupedResults.projects.map(item => (
									<CommandItem
										key={item.id}
										value={item.title}
										onSelect={() => handleSelectItem(item.href)}
									>
										{item.title}
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</>
				)}
			</CommandList>
		</CommandDialog>
	)
}
