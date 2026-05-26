'use client'

import { BubbleBackground } from '@/components/animate-ui/components/backgrounds/bubble'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Pages } from '@/config/pages'
import { AuthSchema } from '@/zod-schemes/auth.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface Props {
	type: 'login' | 'register' | 'forgot-password' | 'reset-password'
}

export function AuthForm({ type }: Props) {
	const isLogin = type === 'login'

	const router = useRouter()

	const form = useForm<z.infer<typeof AuthSchema>>({
		resolver: zodResolver(AuthSchema)
	})

	const onSubmit = (data: z.infer<typeof AuthSchema>) => {
		toast.success(
			isLogin ? 'Logged in successfully' : 'Registered successfully'
		)

		form.reset()

		router.replace(Pages.DASHBOARD)
	}

	return (
		<BubbleBackground className='absolute inset-0 flex h-full w-full items-center justify-center'>
			<div className='relative z-10 max-w-sm rounded-lg bg-white p-6 dark:bg-neutral-800'>
				<h1 className='mb-5 text-2xl font-bold'>
					{isLogin ? 'Login' : 'Register'}
				</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter e-mail'
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter password'
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>Save</Button>
					</form>
				</Form>
			</div>
		</BubbleBackground>
	)
}
