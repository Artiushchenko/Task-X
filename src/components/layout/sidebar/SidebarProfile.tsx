import { ChevronDown } from 'lucide-react'
import { PROFILE } from './data/profile.data'

export function SidebarProfile() {
	// TODO: Implement profile account
	return (
		<div className='mb-10 flex items-center gap-2.5'>
			<div className='bg-primary h-7 w-7 shrink-0 rounded-full' />
			<div>
				<div className='font-medium'>{PROFILE.name}</div>
				<div className='text-xs font-medium opacity-60'>{PROFILE.email}</div>
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
