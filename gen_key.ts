

const kp = await crypto.subtle.generateKey(
  { name: "Ed25519" },
  true,
  ["sign","verify"]
);

const jwkPriv = await crypto.subtle.exportKey("jwk", kp.privateKey);
const jwkPub = await crypto.subtle.exportKey("jwk", kp.publicKey);
console.log(jwkPriv)
console.log()
console.log(jwkPub)
export {}
