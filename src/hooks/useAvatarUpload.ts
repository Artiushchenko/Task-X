import { createClient } from '@/utils/supabase/client'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

interface Props {
	file: File | null
	initialAvatar: string | null
}

const supabase = createClient()

export function useAvatarUpload({ file, initialAvatar }: Props) {
	const [isUploading, setIsUploading] = useState(false)

	const uploadAvatar = useCallback(async () => {
		if (!file) {
			return null
		}

		setIsUploading(true)

		try {
			if (initialAvatar) {
				const oldPath = initialAvatar.split('/avatars/')[1]

				if (oldPath) {
					await supabase.storage.from('avatars').remove([oldPath])
				}
			}

			const fileExtension = file.name.split('.').pop()
			const fileName = `${Date.now()}.${fileExtension}`
			const filePath = `/${fileName}`

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, {
					cacheControl: '3600',
					upsert: false
				})

			if (uploadError) {
				throw uploadError
			}

			const {
				data: { publicUrl }
			} = supabase.storage.from('avatars').getPublicUrl(filePath)

			return publicUrl
		} catch (error) {
			console.error('Error uploading avatar: ', error)
			toast.error('Failed to upload avatar. Please try again')
			return null
		} finally {
			setIsUploading(false)
		}
	}, [file, initialAvatar, supabase])

	return {
		isUploading,
		uploadAvatar
	}
}
