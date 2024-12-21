import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export function middleware(request){

    const accesToken = request.cookies.get('accesToken')?.value;

    const publicPaths = ['/login', '/register', '/'];

    const isPublicPath = publicPaths.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );

    if (!accesToken) {
        if (!publicPaths){
        return NextResponse.redirect(new URL('/url', request.url));
        }
        return NextResponse.next();
    }

    try {
        const decode = jwtDecode(accesToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decode.exp < currentTime){
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.set('accesToken', '', { maxAge: 0 });
            return response;
        }

        return NextResponse.next();
    } catch (error) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('accesToken');
        return response;
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',

    ]
}