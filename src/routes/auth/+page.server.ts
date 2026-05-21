import { authenticate } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "../$types";



export const actions = {

  default: async ({ cookies, request }) => {
    const data = await request.formData()
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!username || !password) {
      return fail(400, {missing: true});

    }
    try {
      const token = await authenticate(username, password);
      cookies.set("Authorization", `Bearer ${token}`, {
        httpOnly: true,
        path: "/",
      })

    } catch (e) {
      console.log(e);
      return fail(400, {fail: true})
    }

    return redirect(303, "/register");

  } 
} satisfies Actions;
