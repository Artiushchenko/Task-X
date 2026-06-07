import { Button } from '@/components/ui/button'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import {
	Dropzone,
	DropzoneEmptyState
} from '@/components/ui/shadcn-io/dropzone'
import { createClient } from '@/utils/supabase/client'
import type { ProfileSchema } from '@/zod-schemes/profile.zod'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type z from 'zod'

interface Props {
	initialAvatar: string | null
	setValue: UseFormSetValue<z.infer<typeof ProfileSchema>>
	isPending: boolean
	isUploading: boolean
	setFile: (file: File | null) => void
}

export function AvatarUploadField({
	initialAvatar,
	setValue,
	isPending,
	isUploading,
	setFile
}: Props) {
	const [preview, setPreview] = useState<string | null>(initialAvatar || null)

	const supabase = createClient()

	const handleDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length === 0) {
			return
		}

		const selectedFile = acceptedFiles[0]
		const reader = new FileReader()

		setFile(selectedFile)

		reader.onloadend = () => {
			setPreview(reader.result as string)
		}
		reader.readAsDataURL(selectedFile)
	}

	const handleRemoveAvatar = () => {
		setFile(null)
		setPreview(null)
		setValue('avatar_path', '')
	}

	return (
		<FormItem>
			<FormLabel>Avatar</FormLabel>

			<FormControl>
				<div className='border-border/60 flex items-center justify-between gap-4 rounded-md border p-4 shadow-xs'>
					<div className='flex w-1/2 flex-col items-center gap-4'>
						<div className='relative inline-block'>
							{preview ? (
								<Image
									src={preview}
									width={64}
									height={64}
									className='h-16 w-16 rounded-full object-cover shadow-sm'
									alt='Avatar'
								/>
							) : (
								<p className='text-sm'>No image</p>
							)}

							{preview && (
								<Button
									type='button'
									size='icon'
									variant='secondary'
									onClick={handleRemoveAvatar}
									className='group absolute -top-1 -right-1 h-5 w-5 rounded-full border shadow-sm transition-all duration-200'
								>
									<X
										size={12}
										className='text-muted-foreground transition-colors duration-200 group-hover:text-red-500'
									/>
								</Button>
							)}
						</div>

						<div className='flex flex-col text-center'>
							<span className='text-muted-foreground text-xs'>
								Allowed file types: images
							</span>
							<span className='text-muted-foreground text-xs'>
								Max size:{' '}
								<strong className='text-foreground font-medium'>5 MB</strong>
							</span>
						</div>
					</div>

					<Dropzone className='w-1/2'>
						<DropzoneEmptyState />
					</Dropzone>
				</div>
			</FormControl>
		</FormItem>
	)
}
