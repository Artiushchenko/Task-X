import { useEffect, useRef, useState } from 'react'

import type { TChatMessageWithProfile } from '@/types/chat.types'
import { createClient } from '@/utils/supabase/client'

interface Props {
	userId: string
}

export const useChat = ({ userId }: Props) => {
	const supabase = useRef(createClient())

	const [messages, setMessages] = useState<TChatMessageWithProfile[]>([])

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
						setMessages(prev => {
							if (prev.some(message => message.id === data.id)) {
								return prev
							}

							return [...prev, data]
						})
					}
				}
			)
			.subscribe()

		return () => {
			supabase.current.removeChannel(channel)
		}
	}, [])

	const sendMessage = async (newMessage: string) => {
		if (!newMessage.trim()) {
			return
		}

		await supabase.current.from('chat_messages').insert({
			user_id: userId,
			text: newMessage
		})
	}

	return {
		messages,
		sendMessage
	}
}
