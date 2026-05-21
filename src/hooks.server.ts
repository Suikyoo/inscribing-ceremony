import { JWT_KEY } from '$env/static/private';
import { type Handle } from '@sveltejs/kit';
import * as jwt from "jose"

export const handle: Handle = async ({ event, resolve }) => {
  const authHead = event.cookies.get("Authorization")
  if (!authHead) {
    const response = await resolve(event);
    return response;
  }

  const [_, token] = authHead?.split(" ");

  if (!JWT_KEY) throw new Error("No JWT Key specified in env variables. ");

  const secret = Buffer.from(JWT_KEY, "base64");

  try {
    await jwt.jwtVerify(token, secret);
    event.locals.auth = true

  } catch {} 	

  const response = await resolve(event);
	return response;
};
