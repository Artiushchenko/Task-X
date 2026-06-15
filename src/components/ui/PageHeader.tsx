import { Heading } from './Heading'

interface Props {
	title: string
	description: string
}

export function PageHeader({ title, description }: Props) {
	return (
		<div className='mb-6'>
			<Heading>{title}</Heading>

			<p className='text-muted-foreground mt-1 text-sm'>{description}</p>
		</div>
	)
}
