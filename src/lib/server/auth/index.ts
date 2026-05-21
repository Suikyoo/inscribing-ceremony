import { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY } from '$env/static/private'
import * as jwt from "jose"

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) throw new Error("No admin username/password as env variables. ");

export async function authenticate(username: string, password: string) {
  if (!JWT_KEY) throw new Error("No JWT Key specified in env variables. ");

  const secret = Buffer.from(JWT_KEY, "base64");

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = await new jwt.SignJWT({})
      .setProtectedHeader({alg: "ed25519"})
      .setExpirationTime('5h')
      .sign(secret);

    return token;

  }

  throw new Error("info doesn't match");

}

