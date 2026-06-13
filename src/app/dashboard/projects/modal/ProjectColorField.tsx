import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import type { TFormProject } from '@/types/project/form.types'
import { Controller, type Control } from 'react-hook-form'

interface Props {
	control: Control<TFormProject>
}

export function ProjectColorField({ control }: Props) {
	return (
		<Controller
			control={control}
			name='color'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Color (optional)</FormLabel>

					<FormControl>
						<input
							type='color'
							className='h-8 w-14 cursor-pointer rounded-md border-0 p-0 outline-0'
							{...field}
							value={field.value ?? ''}
							onChange={e => field.onChange(e.target.value)}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	)
}
