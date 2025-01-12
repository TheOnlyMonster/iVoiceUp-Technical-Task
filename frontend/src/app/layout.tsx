import NavBar from "@/components/layout/navBar";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/AuthContext";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <NavBar />
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
