import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Paperclip } from '@/components/animate-ui/icons/paperclip'
import { Send } from '@/components/animate-ui/icons/send'
import type { TChatMessageWithProfile } from '@/types/chat.types'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { USERS } from '../data/users.data'
import { ChatMessage } from './ChatMessage'

interface Props {
	userId: string
}

export function Chat({ userId }: Props) {
	const supabase = useRef(createClient())

	const [messages, setMessages] = useState<TChatMessageWithProfile[]>([])
	const [newMessage, setNewMessage] = useState('')

	useEffect(() => {
		supabase.current
			.from('chat_messages')
			.select(
				`*,
				profile:profiles (
					id,	
					name, 
					avatar_path
				)`
			)
			.order('created_at', { ascending: true })
			.then(({ data }) => {
				if (!data) {
					return
				}

				setMessages(data)
			})

		const channel = supabase.current
			.channel('chat_messages')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'chat_messages' },
				async payload => {
					const { data } = await supabase.current
						.from('chat_messages')
						.select(
							`*,
								profile:profiles (
									id,	
									name,
									avatar_path
								)
							`
						)
						.eq('id', payload.new.id)
						.single()

					if (data) {
						setMessages(prev => [...prev, data])
					}
				}
			)
			.subscribe()

		return () => {
			supabase.current.removeChannel(channel)
		}
	}, [])

	const sendMessage = async () => {
		if (!newMessage.trim()) {
			return
		}

		await supabase.current.from('chat_messages').insert({
			user_id: userId,
			text: newMessage
		})

		setNewMessage('')
	}

	return (
		<div className='flex h-screen flex-col'>
			<Image
				alt='Chat'
				src='/images/chat-image.png'
				width={350}
				height={530}
				className='chat-header-image w-full shrink-0 object-cover'
			/>

			<div className='flex min-h-0 flex-1 flex-col'>
				<div className='flex items-center gap-2 bg-[#453c9c] px-3.5 py-3'>
					<Image
						alt='Chat partner'
						src={USERS[7].avatarPath || ''}
						width={40}
						height={40}
						className='rounded-full'
					/>

					<div className='leading-snug text-white'>
						<div className='font-medium'>{USERS[6].name}</div>
						<div className='text-xs font-medium opacity-70'>
							Project Manager
						</div>
					</div>
				</div>

				{/* Messages */}

				<div className='flex-1 overflow-y-auto bg-[#3c3495] px-3.5 py-3'>
					<div className='flex flex-col gap-4.5'>
						{messages.map(msg => (
							<ChatMessage
								key={msg.id}
								message={msg}
								userId={userId}
							/>
						))}
					</div>
				</div>

				{/* Form for send message */}
				<div className='flex items-center gap-2 bg-[#5b51b1] px-3.5 py-3'>
					<AnimateIcon animateOnHover>
						<button className='shrink-0 text-white'>
							<Paperclip size={22} />
						</button>
					</AnimateIcon>

					<input
						type='text'
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
						placeholder='Type here...'
						className='w-full bg-transparent p-2 text-white placeholder:text-[#b2aedf] focus:outline-none'
					/>

					<AnimateIcon animateOnHover>
						<button
							className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9383d8] text-white opacity-90 transition-colors hover:opacity-100'
							onClick={sendMessage}
						>
							<Send
								size={18}
								className='-translate-x-px'
							/>
						</button>
					</AnimateIcon>
				</div>
			</div>
		</div>
	)
}
