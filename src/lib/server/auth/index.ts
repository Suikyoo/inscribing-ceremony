import { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } from '$env/static/private'
import * as jwt from "jose"

export async function authenticate(username: string, password: string) {

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) throw new Error("No admin username/password as env variables. ");
  if (!JWT_SECRET) throw new Error("JWT secret unset. ");

  const secret = new TextEncoder().encode(JWT_SECRET);
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = await new jwt.SignJWT({})
    .setProtectedHeader({alg: "HS256"})
    .setExpirationTime('5h')
    .sign(secret);

    return token;

  }

  throw new Error("info doesn't match");

}

