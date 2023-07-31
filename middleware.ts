import { Language } from "@interfaces/global.interface";
import { NextRequest, NextResponse } from "next/server";

let locales: Language[] = [Language.ENGLISH, Language.FRENCH];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  // Check if the cookie is defined
  const cookieLocale = request.cookies.get("lang") as Language | undefined;
  const haveCookieLocaleDefined =
    cookieLocale && locales.includes(cookieLocale as Language);
  if (haveCookieLocaleDefined) return cookieLocale;
  return Language.ENGLISH;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
