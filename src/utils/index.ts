import path from "path";

import { sign } from "jsonwebtoken";
import { secretKey } from './config'
/**
 * @description 获取work路径
 */
export function getWorkDir(dir: string) {
  return path.join(process.cwd(), dir);
}

/**
 * @description 生成 token
 * @param payload user 信息
 * @returns token
 */
export function getToken(payload: any) {
  const expiresIn = Date.now() + 1000 * 60 * 60 * 24 * 7; // token 过期时间
  return `Bearer ${sign(payload, secretKey, { expiresIn })}`;
}
