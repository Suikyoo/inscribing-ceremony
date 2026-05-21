import { JWT_SECRET } from '$env/static/private';
import { type Handle } from '@sveltejs/kit';
import * as jwt from "jose"

export const handle: Handle = async ({ event, resolve }) => {
  const authHead = event.cookies.get("Authorization")
  if (!authHead) {
    const response = await resolve(event);
    return response;
  }

  const [_, token] = authHead?.split(" ");

  if (!JWT_SECRET) throw new Error("No JWT Key specified in env variables. ");

  const secret = new TextEncoder().encode(JWT_SECRET);

  try {
    const {payload, protectedHeader} = await jwt.jwtVerify(token, secret);
    event.locals.auth = true;

  } catch (e){} 	

  const response = await resolve(event);
	return response;
};
