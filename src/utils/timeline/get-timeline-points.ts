import { TIMELINE_CONFIG } from '@/config/timeline'

export function getTimelinePoints(hours: number[], currentHour: number) {
	return hours.map((hour, i) => {
		const raw = (i / (hours.length - 1)) * 100

		const left =
			TIMELINE_CONFIG.LEFT_PAD +
			(raw / 100) * (100 - TIMELINE_CONFIG.LEFT_PAD - TIMELINE_CONFIG.RIGHT_PAD)

		return {
			hour,
			left,
			isPast: hour < currentHour,
			isCurrent: hour === currentHour
		}
	})
}
