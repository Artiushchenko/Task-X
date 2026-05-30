import cn from 'clsx'
import { Paperclip, Send } from 'lucide-react'
import Image from 'next/image'
import { USERS } from '../data/users.data'

const messages = [
	{
		id: 1,
		text: "Morning! I've been working on the design elements",
		author: USERS[3],
		own: false,
		time: '09.28 am'
	},
	{
		id: 2,
		text: "That's great to hear! I've been focusing on market research",
		author: USERS[6],
		own: true,
		time: '09.40 am'
	},
	{
		id: 3,
		text: "Morning! I've been working on the",
		author: USERS[4],
		own: false,
		time: '09.47 am'
	}
]

export function Chat() {
	return (
		<div className='flex h-screen flex-col'>
			<Image
				alt='Chat'
				src='/images/chat-image.png'
				width={354}
				height={531}
				className='chat-header-image shrink-0'
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
							<div
								key={msg.id}
								className={cn(
									'flex items-end gap-2',
									msg.own ? 'justify-end' : 'justify-start'
								)}
							>
								{!msg.own && (
									<Image
										alt={msg.author.name}
										src={msg.author.avatarPath || ''}
										width={40}
										height={40}
										className='rounded-full'
									/>
								)}

								<div className='max-w-[75%]'>
									<div className='mb-0.5 text-xs text-white'>
										{msg.own ? (
											<span className='space-x-1'>
												<span className='opacity-60'>{msg.time}</span>{' '}
												<span className='font-medium'>Me</span>
											</span>
										) : (
											<span className='space-x-1'>
												<span className='font-medium'>{msg.author.name}</span>{' '}
												<span className='opacity-60'>{msg.time}</span>
											</span>
										)}
									</div>

									<div
										className={cn(
											'rounded-xl px-4 py-2 text-sm text-white',
											msg.own
												? 'rounded-br-none bg-[#614bee]'
												: 'rounded-bl-none bg-[#5b51b1]'
										)}
									>
										{msg.text}
									</div>
								</div>

								{msg.own && (
									<Image
										alt={msg.author.name}
										src={msg.author.avatarPath || ''}
										width={40}
										height={40}
										className='rounded-full'
									/>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Form for send message */}
				<div className='flex items-center gap-2 bg-[#5b51b1] px-3.5 py-3'>
					<button className='shrink-0 text-white'>
						<Paperclip />
					</button>

					<input
						type='text'
						placeholder='Type here...'
						className='w-full bg-transparent p-2 text-white placeholder:text-[#b2aedf] focus:outline-none'
					/>

					<button className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9383d8] text-white opacity-90 transition-colors hover:opacity-100'>
						<Send size={18} />
					</button>
				</div>
			</div>
		</div>
	)
}
