import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Seed } from './Seed'

export const metadata: Metadata = {
	title: 'Admin',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<Seed />
		</div>
	)
}
