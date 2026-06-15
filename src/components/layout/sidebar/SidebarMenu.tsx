'use client'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MAIN_MENU } from './data/main-menu.data'

export function SidebarMenu() {
	const pathname = usePathname()

	const isActive = (href: string) => pathname === href

	return (
		<nav className='mt-3 mb-10'>
			<ul className='space-y-4'>
				{MAIN_MENU.map(item => {
					const active = isActive(item.href)

					return (
						<li key={item.href}>
							<Link
								href={item.href}
								className={cn(
									'flex items-center justify-between pl-3 transition-colors',
									active
										? 'text-primary font-bold'
										: 'dark:hover:text-primary text-neutral-500 hover:text-neutral-900 dark:text-white'
								)}
							>
								<AnimateIcon animateOnHover>
									<span className='flex items-center gap-2'>
										<item.icon size={20} />

										<span>{item.label}</span>
									</span>
								</AnimateIcon>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
