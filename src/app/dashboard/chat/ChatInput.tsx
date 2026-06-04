import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Paperclip } from '@/components/animate-ui/icons/paperclip'
import { Send } from '@/components/animate-ui/icons/send'
import { memo, useState } from 'react'

interface Props {
	sendMessage: (newMessage: string) => Promise<void>
}

function ChatInput({ sendMessage }: Props) {
	const [newMessage, setNewMessage] = useState('')

	return (
		<div className='flex items-center gap-2 bg-[#5b51b1] px-3.5 py-3'>
			<AnimateIcon animateOnHover>
				<button
					className='shrink-0 text-white'
					aria-label='Attach file'
				>
					<Paperclip size={22} />
				</button>
			</AnimateIcon>

			<input
				type='text'
				value={newMessage}
				onChange={e => setNewMessage(e.target.value)}
				placeholder='Type here...'
				aria-label='Type your message'
				className='w-full bg-transparent p-2 text-white placeholder:text-[#b2aedf] focus:outline-none'
			/>

			<AnimateIcon animateOnHover>
				<button
					className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9383d8] text-white opacity-90 transition-colors hover:opacity-100'
					onClick={() => sendMessage(newMessage).then(() => setNewMessage(''))}
					aria-label='Send message'
				>
					<Send
						size={18}
						className='-translate-x-px'
					/>
				</button>
			</AnimateIcon>
		</div>
	)
}

export default memo(ChatInput)
