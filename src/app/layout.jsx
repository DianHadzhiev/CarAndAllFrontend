// layout.jsx
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-blue-100 text-black flex flex-col min-h-screen">
                <AuthProvider initialAuthState>
                    <Header />
                    <main className="flex-grow mx-auto w-full max-w-[1920px] px-4">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}