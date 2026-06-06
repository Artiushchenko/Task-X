import { updateProfile } from '@/services/profile/profile-client.service'
import type { TUpdateProfile } from '@/types/profile.types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSettingsQueries() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['profile', 'update'],
		mutationFn: (data: TUpdateProfile) => updateProfile(data),
		onSuccess: () => {
			toast.success('Profile updated successfully')
		},
		onError: error => {
			toast.error('Failed to update profile', {
				description: error as unknown as string
			})
		}
	})

	return {
		isPending,
		mutate
	}
}
