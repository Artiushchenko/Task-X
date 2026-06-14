import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerUserEntities } from '@/services/user/user-activity-server.service'
import { Activities } from './Activities'

export const metadata: Metadata = {
	title: 'Activities',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const data = await getServerUserEntities()

	return <Activities data={data} />
}
