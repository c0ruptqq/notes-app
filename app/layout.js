import "@/styles/globals.css";
import Theme from "@/components/theme";
import Sidebar from "@/components/sidebar";
import { Provider } from "./provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

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
      <body className="min-h-screen" >
        <Provider themeProps={{ attribute: "class" }}>
          <Theme />
          <Sidebar />
          <SpeedInsights />
          <Analytics />
          {/*   <Graph /> Temporalily disabled*/}
          {children}
        </Provider>
      </body>
    </html>
  );
}
