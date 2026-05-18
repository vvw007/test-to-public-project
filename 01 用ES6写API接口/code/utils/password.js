import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';

/**
 * 哈希密码
 * @param {string} password - 明文密码
 * @returns {Promise<string>} 哈希后的密码
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
  return bcrypt.hash(password, salt);
}

/**
 * 验证密码
 * @param {string} plainPassword - 明文密码
 * @param {string} hashedPassword - 哈希密码
 * @returns {Promise<boolean>} 是否匹配
 */
export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}