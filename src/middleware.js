import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/desktop")
    || request.nextUrl.pathname.startsWith("/mobile")) {
    return new NextResponse("FILE NOT FOUND", {
      status: 404
    })
  }
  if (request.nextUrl.pathname === '/') {
    const { device } = userAgent(request);
    const isMobile = device.type === 'mobile'
    const newUrl = new URL(request.nextUrl)
    if (isMobile) {
      newUrl.pathname = "/mobile" + newUrl.pathname;
    } else {
      newUrl.pathname = "/desktop" + newUrl.pathname;
    }
    return NextResponse.rewrite(newUrl)
  }
  return NextResponse.next();
}