import { Inter } from "next/font/google"
import { ThemeProvider } from "../View/App/components/theme-provider"
import Header from "../View/App/components/header"
import Footer from "../View/App/components/footer"
// import { Toaster } from "../View/App/components//ui/toaster"
import { AuthProvider } from "../View/context/auth-context"   
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Pound Puppies and Kittens",
    description: "Find your forever friend at Pound Puppies and Kittens",
}

export default function RootLayout({ children }) {
    return (
        <html lang = "en" suppressHydrationWarning = {true}>
            <body className={inter.className}>
                <ThemeProvider attribute = "class">
                    <AuthProvider>
                        <div className = "flex min-h-screen flex-col max-w-7xl mx-auto px-4">
                            <Header />
                            <main className = "flex-1" > {children} </main>
                            <Footer />
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}