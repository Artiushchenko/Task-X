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
import { Input } from '@/components/ui/input'
import { AuthSchema } from '@/zod-schemes/auth.zod'
import { zodResolver } from '@hookform/resolvers/zod'
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
			.finally(() => {
				form.reset()
			})
	}

	return (
		<div className='absolute inset-0 flex h-full w-full items-center justify-center bg-linear-to-tr from-violet-400 to-amber-400'>
			<div className='relative z-10 max-w-sm rounded-lg bg-white p-6 dark:bg-neutral-800'>
				<h1 className='mb-5 text-2xl font-bold'>Sign in with magic link</h1>

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

						<Button type='submit'>Send link</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
