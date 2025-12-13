import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function tokenOlustur(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function tokenDogrula(token: string) {
  return jwt.verify(token, SECRET);
}
