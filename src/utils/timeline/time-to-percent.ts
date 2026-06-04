import { INNER_WIDTH, TIMELINE_CONFIG, TOTAL_MINUTES } from '@/config/timeline'
import { getHours, getMinutes } from 'date-fns'

export const timeToPercent = (date: Date) => {
	const minutes = getHours(date) * 60 + getMinutes(date)
	const startMinutes = TIMELINE_CONFIG.START_HOUR * 60

	const raw = ((minutes - startMinutes) / TOTAL_MINUTES) * 100

	return TIMELINE_CONFIG.LEFT_PAD + (raw / 100) * INNER_WIDTH
}
