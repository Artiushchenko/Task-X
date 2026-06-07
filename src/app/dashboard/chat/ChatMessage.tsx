import type { TChatMessageWithProfile } from '@/types/chat.types'
import { cn } from '@/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { memo } from 'react'

interface Props {
	message: TChatMessageWithProfile
	userId: string
}

function ChatMessage({ message, userId }: Props) {
	const isOwnMessage = userId === message.user_id

	return (
		<div
			key={message.id}
			className={cn(
				'flex items-end gap-2',
				isOwnMessage ? 'justify-end' : 'justify-start'
			)}
		>
			{!isOwnMessage && (
				<Image
					alt={message.profile?.name || ''}
					src={message.profile?.avatar_path || ''}
					width={40}
					height={40}
					className='h-10! shrink-0 rounded-full object-cover'
					draggable={false}
				/>
			)}

			<div className='max-w-[75%]'>
				<div className='mb-0.5 text-xs text-white'>
					{isOwnMessage ? (
						<span className='space-x-1'>
							<span className='opacity-60'>
								{message.created_at
									? format(new Date(message.created_at), 'hh:mm a')
									: ''}
							</span>{' '}
							<span className='font-medium'>Me</span>
						</span>
					) : (
						<span className='space-x-1'>
							<span className='font-medium'>{message.profile?.name}</span>{' '}
							<span className='opacity-60'>
								{message.created_at
									? format(new Date(message.created_at), 'hh:mm a')
									: ''}
							</span>
						</span>
					)}
				</div>

				<div
					className={cn(
						'rounded-xl px-4 py-2 text-sm text-white',
						isOwnMessage
							? 'rounded-br-none bg-[#614bee]'
							: 'rounded-bl-none bg-[#5b51b1]'
					)}
				>
					{message.text}
				</div>
			</div>

			{isOwnMessage && (
				<Image
					alt={message.profile?.name || ''}
					src={message.profile?.avatar_path || ''}
					width={40}
					height={40}
					className='h-10! shrink-0 rounded-full object-cover'
					draggable={false}
				/>
			)}
		</div>
	)
}

export default memo(ChatMessage)
