import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from './utils/helpers';

export async function middleware(request: NextRequest) {

    const token = cookies().get('jwt')?.value;
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

    if (token) {
        const isValid = await verifyToken(token, secretKey);
        if (isValid) {
          if(request.nextUrl.pathname === '/login'){
            const url = request.nextUrl.clone();
            url.pathname = '/profile';
            return NextResponse.redirect(url);
          }
            return NextResponse.next();
        }
    } else {
        if(request.nextUrl.pathname === '/login'){
            return NextResponse.next();
        }
    }

    console.log('Redirecting to login page');

    const url = request.nextUrl.clone();
    url.pathname = '/login';

    const res = NextResponse.redirect(url);
    res.cookies.set('jwt', '', { httpOnly: true });

    return res;
}

export const config = {
  matcher: ['/protected','/profile', '/login']
}
