interface Props {
	message: string
}

export function ErrorState({ message }: Props) {
	return (
		<div className='flex h-screen items-center justify-center p-5'>
			<p className='text-muted-foreground'>{message}</p>
		</div>
	)
}
