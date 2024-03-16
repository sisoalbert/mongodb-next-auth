import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const JWT_COOKIE = "sessionToken";

export async function getUserFromSession() {
  const sessionTokenCookie = cookies().get(JWT_COOKIE);
  const JWT_SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET_KEY as string
  );

  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify(
        sessionTokenCookie.value,
        JWT_SECRET_KEY
      );
      return payload;
    } catch (error) {
      console.warn("Invalid session token", error);
    }
  }
}

export async function setSessionCookie(user: JWTPayload) {
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER as string)
    .setAudience(process.env.JWT_AUDIENCE as string)
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY as string));

  cookies().set("sessionToken", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}
