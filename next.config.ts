import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'mppdygwrzrsnqmilpuca.supabase.co',
				port: '',
				pathname: '/**'
			}
		]
	},
	experimental: {
		turbopackFileSystemCacheForDev: true
	}
}

export default nextConfig
