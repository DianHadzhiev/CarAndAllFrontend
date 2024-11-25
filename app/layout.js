import "./globals.css"; // Global styles
import Header from "./components/Header"; // Import Header component
import "./components/Header.css"; // Import Header styles

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Header />
        <div className="container">
            <main>{children}</main>
        </div>
        </body>
        </html>
    );
}