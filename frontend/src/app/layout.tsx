
import NavBar from "@/components/layout/navBar"
import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}