import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import type { TTaskFormControl } from '@/types/task.types'
import { ICON_MAP, ICON_NAMES } from '@/utils/icon-map'
import { Controller } from 'react-hook-form'

interface Props {
	control: TTaskFormControl
}

export function TaskIconChooseField({ control }: Props) {
	return (
		<Controller
			control={control}
			name='icon'
			render={({ field: { onChange, value } }) => (
				<FormItem>
					<FormLabel>Icon</FormLabel>
					<FormControl>
						<div className='flex flex-wrap gap-2'>
							{ICON_NAMES.map(name => {
								const Icon = ICON_MAP[name]

								return (
									<Button
										type='button'
										key={name}
										variant={value === name ? 'default' : 'outline'}
										onClick={() => onChange(name)}
										className='h-10 w-10 p-0'
									>
										<Icon size={18} />
									</Button>
								)
							})}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
