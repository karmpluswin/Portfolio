import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Allow HMR and other dev resources to be accessed from your LAN IPs
	allowedDevOrigins: [
		"10.181.249.222",
		"10.75.70.222",
		"10.56.11.222",
		"10.135.139.222",
		"http://10.181.249.222",
		"http://10.181.249.222:3000",
		"http://10.75.70.222",
		"http://10.75.70.222:3000",
		"http://10.56.11.222",
		"http://10.56.11.222:3000",
		"http://10.135.139.222",
		"http://10.135.139.222:3000",
	],
};

export default nextConfig;
