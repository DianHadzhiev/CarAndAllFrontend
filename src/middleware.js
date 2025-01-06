import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export function middleware(request) {
    const accesToken = request.cookies.get('accesToken')?.value;

    const publicPaths = ['/login', '/register', '/'];
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    // Bypass authentication in development
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    // If no token and not a public path, redirect to login
    if (!accesToken && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If token exists, validate it
    if (accesToken) {
        try {
            const decode = jwtDecode(accesToken);
            const currentTime = Math.floor(Date.now() / 1000);

            // If token is expired, redirect to login and clear the token
            if (decode.exp < currentTime) {
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.set('accesToken', '', { maxAge: 0 });
                return response;
            }

            // Token is valid, proceed to the requested page
            return NextResponse.next();
        } catch (error) {
            // If token is invalid, redirect to login and clear the token
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('accesToken');
            return response;
        }
    }

    // Allow access to public paths
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
};

// import { NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";

// export function middleware(request){

//     const accesToken = request.cookies.get('accesToken')?.value;

//     const publicPaths = ['/login', '/register', '/'];

//     const isPublicPath = publicPaths.some(path => 
//         request.nextUrl.pathname.startsWith(path)
//     );

//     if (!accesToken) {
//         if (!publicPaths){
//         return NextResponse.redirect(new URL('/url', request.url));
//         }
//         return NextResponse.next();
//     }

//     try {
//         const decode = jwtDecode(accesToken);
//         const currentTime = Math.floor(Date.now() / 1000);

//         if (decode.exp < currentTime){
//             const response = NextResponse.redirect(new URL('/login', request.url));
//             response.cookies.set('accesToken', '', { maxAge: 0 });
//             return response;
//         }

//         return NextResponse.next();
//     } catch (error) {
//         const response = NextResponse.redirect(new URL('/login', request.url));
//         response.cookies.delete('accesToken');
//         return response;
//     }
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',

//     ]
// }