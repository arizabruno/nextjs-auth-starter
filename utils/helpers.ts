import { jwtVerify } from 'jose';

export async function verifyToken(token: string, secretKey: Uint8Array) {
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
