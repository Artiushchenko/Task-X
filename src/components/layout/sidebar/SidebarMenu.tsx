import Link from 'next/link'
import { MAIN_MENU } from './data/main-menu.data'

export function SidebarMenu() {
	return (
		<nav className='mb-10 mt-3'>
			<ul className='space-y-4'>
				{MAIN_MENU.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							className='text-neutral-500 dark:text-white flex items-center justify-between hover:text-neutral-900 hover:dark:text-primary transition-colors pl-3'
						>
							<span className='flex items-center gap-2'>
								<item.icon size={20} />
								<span>{item.label}</span>
							</span>
							{item.label === 'Messages' && (
								<span className='text-primary bg-[#dcdef6] rounded-lg px-2 text-xs font-medium'>
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
