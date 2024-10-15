<<<<<<< HEAD
version https://git-lfs.github.com/spec/v1
oid sha256:fbaab6ee9bdff7d61eca1aeb45ac409800fb496accf2f1eabb03509e15fe7132
size 597
=======
import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth/authMiddleware';

// Global middleware
export function middleware(request) {
  // Apply global logic
  console.log(`Request made to ${request.url}`);

  // Apply auth middleware to specific routes
  if (
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/report')
  ) {
    return authMiddleware(request);
  }

  return NextResponse.next();
}

// Apply global middleware to all routes
export const config = {
  matcher: ['/', '/dashboard', '/report/:path*'],
};
>>>>>>> 7f1fe6d483b3580b1d12e3b284685f4b1b690054
