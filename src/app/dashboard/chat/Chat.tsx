import Image from 'next/image'

import { useChat } from '@/hooks/useChat'
import { useMemo } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

interface Props {
	userId: string
}

export function Chat({ userId }: Props) {
	const { messages, sendMessage } = useChat({ userId })

	const renderedMessages = useMemo(() => {
		return messages.map(msg => (
			<ChatMessage
				key={msg.id}
				message={msg}
				userId={userId}
			/>
		))
	}, [messages, userId])

	return (
		<div className='flex h-screen flex-col'>
			<Image
				alt='Chat'
				src='/images/chat-image.png'
				width={350}
				height={530}
				className='chat-header-image w-full shrink-0 object-cover'
				draggable={false}
			/>

			<div className='flex min-h-0 flex-1 flex-col'>
				<div className='bg-[#453c9c] p-3.5 text-center uppercase'>Chat</div>

				<div className='flex-1 overflow-y-auto bg-[#3c3495] px-3.5 py-3'>
					<div className='flex flex-col gap-4.5'>{renderedMessages}</div>
				</div>

				<ChatInput sendMessage={sendMessage} />
			</div>
		</div>
	)
}
