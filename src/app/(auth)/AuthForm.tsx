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
import { DashboardPages } from '@/config/dashboard-pages'
import { authStore } from '@/stores/auth.store'
import { AuthSchema } from '@/zod-schemes/auth.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface Props {
	type: 'login' | 'register' | 'forgot-password' | 'reset-password'
}

export const AuthForm = observer(({ type }: Props) => {
	const isLogin = type === 'login'

	const router = useRouter()

	const form = useForm<z.infer<typeof AuthSchema>>({
		resolver: zodResolver(AuthSchema)
	})

	const onSubmit = (data: z.infer<typeof AuthSchema>) => {
		authStore.login()

		form.reset()

		if (authStore.isLoggedIn) {
			toast.success(
				isLogin ? 'Logged in successfully' : 'Registered successfully'
			)

			router.replace(DashboardPages.DASHBOARD)
		}
	}

	return (
		<div className='absolute inset-0 flex h-full w-full items-center justify-center bg-linear-to-tr from-violet-400 to-amber-400'>
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
		</div>
	)
})
