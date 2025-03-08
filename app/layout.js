import "@/styles/globals.css";
import { Provider } from "./provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Header from "@/components/header";

export const metadata = {
  title: "MD Notes",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="/katex.css"
        />
      </head>
      <body className="min-h-screen">
        <Provider themeProps={{ attribute: "class" }}>
         <Header />
          <SpeedInsights />
          <Analytics />
          {/*   <Graph /> Temporalily disabled*/}
          {children}
        </Provider>
      </body>
    </html>
  );
}
