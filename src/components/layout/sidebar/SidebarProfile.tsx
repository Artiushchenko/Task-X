import { ChevronDown } from 'lucide-react'
import { PROFILE } from './data/profile.data'

export function SidebarProfile() {
	return (
		<div className='mb-10 flex items-center gap-2.5'>
			<div className='w-7 h-7 bg-primary rounded-full shrink-0' />
			<div>
				<div className='font-medium'>{PROFILE.name}</div>
				<div className='opacity-60 text-xs font-medium'>{PROFILE.email}</div>
			</div>
			<div className='ml-1'>
				<ChevronDown
					size={16}
					className='opacity-60'
				/>
			</div>
		</div>
	)
}
