import { Button } from '@/components/ui/button'
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { getProjects } from '@/services/projects/project-client.service'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { CommandEmpty } from 'cmdk'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

interface Props {
	value: string | undefined
	onChange: (value: string) => void
}

export function SelectTaskProject({ value, onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	const { isPending, data } = useQuery({
		queryKey: ['projects'],
		queryFn: () => getProjects(),
		select: data =>
			data.map(project => ({
				value: project.id,
				label: project.name
			}))
	})

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={isOpen}
					className='w-50 justify-between'
				>
					{isPending
						? 'Loading...'
						: value
							? data?.find(project => project.value === value)?.label
							: 'Select project...'}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-50 p-0'>
				<Command>
					<CommandInput
						placeholder='Search project...'
						className='h-9'
					/>
					<CommandList>
						<CommandEmpty>No project found</CommandEmpty>
						<CommandGroup>
							{data?.map(project => (
								<CommandItem
									key={project.value}
									onSelect={() => {
										onChange(project.value)
										setIsOpen(false)
									}}
								>
									{project.label}
									<Check
										className={cn(
											'ml-auto',
											value === project.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
