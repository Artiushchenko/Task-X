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
import { getAllProfiles } from '@/services/profile/profile-client.service'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { CommandEmpty } from 'cmdk'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

interface Props {
	value: string[] | undefined
	onChange: (value: string[]) => void
}

export function SelectTaskParticipants({ value = [], onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	const { isPending, data } = useQuery({
		queryKey: ['task-participants'],
		queryFn: () => getAllProfiles()
	})

	const toggleParticipant = (id: string) => {
		if (value.includes(id)) {
			onChange(value.filter(v => v !== id))
		} else {
			onChange([...value, id])
		}
	}

	const selectedProfiles = useMemo(() => {
		if (!data?.length || !value.length) return []

		const selectedIds = new Set(value)

		return data.filter(profile => selectedIds.has(profile.id))
	}, [data, value])

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<PopoverTrigger asChild>
				<div
					role='combobox'
					aria-expanded={isOpen}
					className={cn(
						'border-input bg-background flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-sm',
						'hover:bg-accent/30 transition-colors'
					)}
				>
					<div className='flex flex-1 flex-wrap items-center gap-1'>
						{isPending ? (
							<span>Loading...</span>
						) : selectedProfiles.length ? (
							selectedProfiles.map(profile => (
								<div
									key={profile.id}
									className='bg-muted flex items-center gap-1 rounded-md px-2 py-1'
								>
									<Image
										src={profile.avatar_path || ''}
										alt={profile.name || 'Participant'}
										width={18}
										height={18}
										className='rounded-full'
									/>

									<span className='max-w-24 truncate text-xs'>
										{profile.name}
									</span>

									<Button
										type='button'
										variant='ghost'
										size='icon'
										className='text-muted-foreground h-4 w-4 transition-colors duration-200 hover:text-red-500'
										onClick={e => {
											e.stopPropagation()

											onChange(value.filter(id => id !== profile.id))
										}}
									>
										<X className='h-3 w-3' />
									</Button>
								</div>
							))
						) : (
							<span className='text-muted-foreground'>
								Select participant(s)...
							</span>
						)}
					</div>

					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</div>
			</PopoverTrigger>

			<PopoverContent
				align='start'
				className='w-87.5 p-0'
			>
				<Command>
					<CommandInput
						placeholder='Search profile...'
						className='h-9'
					/>

					<CommandList>
						<CommandEmpty>No profile found</CommandEmpty>

						<CommandGroup>
							{data?.map(profile => (
								<CommandItem
									key={profile.id}
									onSelect={() => toggleParticipant(profile.id)}
								>
									<div className='flex items-center gap-2'>
										<Image
											src={profile.avatar_path || ''}
											alt={profile.name || 'Participant'}
											width={24}
											height={24}
											className='rounded-full'
										/>

										<span>{profile.name}</span>
									</div>

									<Check
										className={cn(
											'ml-auto',
											value.includes(profile.id) ? 'opacity-100' : 'opacity-0'
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
