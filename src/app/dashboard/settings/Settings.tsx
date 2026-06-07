'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/input'
import { useAvatarUpload } from '@/hooks/useAvatarUpload'
import { useSettingsQueries } from '@/hooks/useSettingsQueries'
import type { TProfileResponse } from '@/types/profile.types'
import { ProfileSchema } from '@/zod-schemes/profile.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import { AvatarUploadField } from './AvatarUploadField'

interface Props {
	profile: TProfileResponse
}

export function Settings({ profile }: Props) {
	const [file, setFile] = useState<File | null>(null)
	const { isUploading, uploadAvatar } = useAvatarUpload({
		file,
		initialAvatar: profile?.avatar_path || null
	})

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: profile?.name || '',
			email: profile?.email || '',
			avatar_path: profile?.avatar_path || ''
		}
	})

	const { mutate, isPending } = useSettingsQueries()

	const onSubmit: SubmitHandler<z.infer<typeof ProfileSchema>> = async data => {
		let avatarUrl = data.avatar_path

		if (file) {
			const uploadedUrl = await uploadAvatar()

			if (uploadedUrl) {
				avatarUrl = uploadedUrl
			} else {
				return
			}
		}

		mutate({
			avatar_path: avatarUrl,
			id: profile.id
		})
	}

	return (
		<div className='max-w-xl p-5'>
			<Heading className='mb-6'>Settings</Heading>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<AvatarUploadField
						initialAvatar={profile.avatar_path}
						setValue={form.setValue}
						isPending={isPending}
						isUploading={isUploading}
						setFile={setFile}
					/>

					<Button
						type='submit'
						disabled={isPending}
					>
						{isPending ? 'Updating...' : 'Save'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
