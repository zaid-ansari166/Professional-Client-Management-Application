export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/template/:path*', '/clients/:path*', '/summary/:path*'],
};
