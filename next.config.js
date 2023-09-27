/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		BASE_URL: "https://afruna-backend-cmsxg.ondigitalocean.app/api/v1",
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination:
					"https://afruna-backend-cmsxg.ondigitalocean.app/api/v1/:path*",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "afruna-bucket.nyc3.digitaloceanspaces.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
