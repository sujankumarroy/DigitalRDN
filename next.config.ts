import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kcksejyyjfgpcdmgtzrc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
