import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import Link from 'next/link'
import { MAIN_MENU } from './data/main-menu.data'

export function SidebarMenu() {
	return (
		<nav className='mt-3 mb-10'>
			<ul className='space-y-4'>
				{MAIN_MENU.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							className='hover:dark:text-primary flex items-center justify-between pl-3 text-neutral-500 transition-colors hover:text-neutral-900 dark:text-white'
						>
							<AnimateIcon animateOnHover>
								<span className='flex items-center gap-2'>
									<item.icon size={20} />
									<span>{item.label}</span>
								</span>
							</AnimateIcon>
							{item.label === 'Messages' && (
								<span className='text-primary rounded-lg bg-[#dcdef6] px-2 text-xs font-medium dark:bg-neutral-600'>
									4
								</span>
							)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
