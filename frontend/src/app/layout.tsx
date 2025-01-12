import NavBar from "@/components/layout/navBar";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/AuthContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <Toaster />
            <NavBar />
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
