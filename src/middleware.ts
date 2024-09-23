import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
  isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
  // is not public page and not authenticated
  if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // Redirect users from /auth if authenticated
  if (isPublicPage(request) && isAuthenticatedNextjs()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
