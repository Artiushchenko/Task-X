import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import type { TTaskFormControl } from '@/types/task.types'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

interface Props {
	control: TTaskFormControl
}

export function TaskDateField({ control }: Props) {
	return (
		<FormField
			control={control}
			name='due_date'
			render={({ field: { onChange, value } }) => (
				<FormItem>
					<FormLabel>Due Date</FormLabel>
					<FormControl>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant='outline'
									data-empty={!value}
									className='data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal'
								>
									<CalendarIcon />
									{value ? format(value, 'PPP') : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={value}
									onSelect={onChange}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
