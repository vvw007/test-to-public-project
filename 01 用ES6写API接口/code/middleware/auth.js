import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { error } from '../utils/response.js';

/**
 * JWT 认证中间件
 * 验证请求头中的 Authorization: Bearer <token>
 */
export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return error(res, '未提供认证令牌', 401);
    }

    // 验证令牌
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // 将用户信息添加到 req 对象
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return error(res, '令牌已过期', 401);
    }
    if (err.name === 'JsonWebTokenError') {
      return error(res, '无效的令牌', 401);
    }
    return error(res, '认证失败', 401);
  }
}

/**
 * 可选认证中间件
 * 如果有 token 则解析，没有则跳过
 */
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
    }
    next();
  } catch (err) {
    // 令牌无效或过期，但不阻止请求继续
    next();
  }
}

/**
 * 角色权限验证中间件
 * @param {string[]} roles - 允许的角色列表
 */
export function authorizeRoles(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, '未认证', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(res, '权限不足', 403);
    }

    next();
  };
}
export async function login(req, res) {
  console.log('请求体:', req.body);  // 添加这一行
  const { username, password } = req.body;
  // ...
}