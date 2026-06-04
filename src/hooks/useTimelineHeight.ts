import { TIMELINE_CONFIG } from '@/config/timeline'
import { useMemo } from 'react'

export const useTimelineHeight = (maxRow: number) => {
	return useMemo(() => {
		const ROW_HEIGHT = TIMELINE_CONFIG.TASK_HEIGHT + TIMELINE_CONFIG.ROW_GAP

		const padding = 6

		return maxRow * ROW_HEIGHT + TIMELINE_CONFIG.TASK_HEIGHT + padding
	}, [maxRow])
}
