'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthSchema } from '@/zod-schemes/auth.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { signInWithEmail } from './actions'

export const AuthForm = () => {
	const form = useForm<z.infer<typeof AuthSchema>>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: ''
		}
	})

	const onSubmit = (data: z.infer<typeof AuthSchema>) => {
		signInWithEmail({ email: data.email })
			.then(() => {
				toast.success(
					'Link to sign in has been sent to your email. Please check your inbox',
					{
						id: 'auth-success'
					}
				)
			})
			.catch(error => {
				toast.error(
					`Failed to send sign-in link. Please try again later. Error: ${error.message}`,
					{
						id: 'auth-error'
					}
				)
			})
			.finally(() => form.reset())
	}

	return (
		<div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-4 text-neutral-900 dark:bg-neutral-950 dark:text-white'>
			<div className='animate-in fade-in zoom-in-95 relative w-full max-w-md rounded-3xl border border-neutral-200 bg-white/80 p-10 text-neutral-900 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 dark:border-white/10 dark:bg-neutral-900/70 dark:text-white dark:shadow-black/20'>
				<div className='mb-8 flex flex-col items-center text-center'>
					<div className='mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400'>
						<Mail className='h-8 w-8' />
					</div>

					<h1 className='text-3xl font-bold tracking-tight text-neutral-900 dark:text-white'>
						Access your workspace
					</h1>

					<p className='mt-2 max-w-xs text-sm leading-6 text-neutral-700 dark:text-neutral-300'>
						We will send you a magic link to securely sign in or create your
						account.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type='email'
											placeholder='you@example.com'
											className='h-12 rounded-xl border border-neutral-200 bg-white px-4 text-base text-neutral-900 shadow-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500'
											{...field}
										/>
									</FormControl>

									<FormMessage className='pt-1 text-sm' />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='h-12 w-full rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]'
						>
							Send magic link
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
