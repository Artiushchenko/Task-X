import type { Database } from './db.types'

export type TChatMessageWithProfile =
	Database['public']['Tables']['chat_messages']['Row'] & {
		profile: Database['public']['Tables']['profiles']['Row'] | null
	}
