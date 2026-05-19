interface Props {
	title: string
}

export function SidebarHeading({ title }: Props) {
	return (
		<div className='font-medium mb-1.5 text-neutral-400 dark:text-white opacity-70'>
			{title}
		</div>
	)
}
