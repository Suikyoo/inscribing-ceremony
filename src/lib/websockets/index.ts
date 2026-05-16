import { env } from "$env/dynamic/public";


export const connect = (func: (id: number) => void) => {
  if (!env.PUBLIC_SOCKET_URL) throw new Error("SOCKET_URL env variable not set.")
  const socket = new WebSocket(env.PUBLIC_SOCKET_URL);
  socket.addEventListener("message", async (e) => {
    let id = -1;
    if (e.data instanceof Blob) {
      id = Number(await e.data.text());
    } else {
      id = Number(e.data);
    }
    func(id);
  })

  return socket;
}
