import "@/styles/globals.css";
import Theme from "@/components/theme";
import Sidebar from "@/components/sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { NavBar } from "./(landing)/_components/navbar";
export const metadata = {
  title: "MD Notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="/katex.css"
        />
      </head>
      <body>
        <ConvexClientProvider>
            {/*<Theme />
            <Sidebar />*/}
            <SpeedInsights />
            <Analytics />
            {/*   <Graph /> Temporalily disabled*/}
            {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
