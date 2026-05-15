import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Allow HMR and other dev resources to be accessed from your LAN IPs
	allowedDevOrigins: [
		"10.181.249.222",
		"http://10.181.249.222",
		"http://10.181.249.222:3000",
	],
};

export default nextConfig;
