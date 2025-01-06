
import "./globals.css";
import Header from "./components/Header"; 
import { AuthProvider } from "./context/AuthContext";

export default async function RootLayout({ children }) {

    return (
        <html lang="en">

            <body className="bg-blue-100 text-black">
                <AuthProvider initialAuthState>
                <Header /> 
                <main className="mx-80 px-4">{children}</main> 
                </AuthProvider>   
            </body>
            
        </html>
    );
}
