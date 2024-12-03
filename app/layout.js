//layout.js
import "./globals.css"; // Global styles
import Header from "./components/Header"; // Import Header component

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="bg-blue-400 text-black">
        <Header />
        <main>{children}</main>
        </body>
        </html>
    );
}
