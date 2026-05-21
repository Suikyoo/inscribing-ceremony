import { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_KEY } from '$env/static/private'
import * as jwt from "jose"

function parseJWK() {
  if (!JWT_KEY) throw new Error("No JWT Key specified in env variables. ");

  const jsonBytes = jwt.base64url.decode(JWT_KEY);
  const jsonString = new TextDecoder().decode(jsonBytes);
  const jwk = JSON.parse(jsonString) // { kty, crv, d, x, ... }
  return jwk

}
async function getPublicKey() {
  const jwk = parseJWK();
  const { d, ...rest} = jwk;
  const pubKey = await jwt.importJWK({...rest}, 'EdDSA');
  return pubKey;
}

async function getPrivateKey() {
  const jwk = parseJWK();
  const privKey = await jwt.importJWK(jwk, 'EdDSA' )
  return privKey;
}

export async function authenticate(username: string, password: string) {

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) throw new Error("No admin username/password as env variables. ");
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = await new jwt.SignJWT({})
    .setProtectedHeader({alg: "edDSA"})
    .setExpirationTime('5h')
    .sign(await getPrivateKey());

    console.log("token: ", token);
    return token;

  }

  throw new Error("info doesn't match");

}

