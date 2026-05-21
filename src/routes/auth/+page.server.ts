import { authenticate } from "$lib/server/auth";
import { fail } from "@sveltejs/kit";
import type { Actions } from "../$types";



export const actions = {

  default: async ({ cookies, request }) => {
    const data = await request.formData()
    const username = data.get("name")?.toString();
    const password = data.get("id")?.toString();

    if (!username || !password) {
      return fail(400, {missing: true});

    }
    try {
      const token = await authenticate(username, password);
      cookies.set("Authorization", `Bearer ${token}`, {
        httpOnly: true,
        path: "/",
      })

    } catch {
      return fail(400, {fail: true})
    }

    return ({success: true})

  } 
} satisfies Actions;
