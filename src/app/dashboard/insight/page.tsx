import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { getServerInsightsData } from '@/services/insights/insights-server.service'
import { insightsService } from '@/services/insights/insights.service'
import { Insights } from './Insights'

export const metadata: Metadata = {
	title: 'Insights',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const data = await getServerInsightsData()

	const insights = insightsService.calculate(data.data)

	return <Insights data={insights} />
}
