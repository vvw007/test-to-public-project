import jwt from 'jsonwebtoken';
import db from '../db/db.js';
import { config } from '../config/config.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { success, error } from '../utils/response.js';

/**
 * 用户注册
 */
export async function register(req, res) {
  const { username, password, nickname, email } = req.body;

  try {
    // 检查用户名是否已存在
    const [existing] = await db.query('SELECT id FROM ev_users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return error(res, '用户名已被使用', 409);
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password);

    // 插入用户
    const [result] = await db.query(
      'INSERT INTO ev_users (username, password, nickname, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, nickname || '', email || '']
    );

    // 生成 JWT
    const token = jwt.sign(
      { id: result.insertId, username, nickname: nickname || '' },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return success(res, {
      id: result.insertId,
      username,
      nickname: nickname || '',
      token,
    }, '注册成功', 201);

  } catch (err) {
    console.error('注册失败:', err);
    return error(res, '注册失败', 500);
  }
}

/**
 * 用户登录
 */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    // 查询用户
    const [users] = await db.query(
      'SELECT id, username, nickname, password FROM ev_users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return error(res, '用户名或密码错误', 401);
    }

    const user = users[0];

    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return error(res, '用户名或密码错误', 401);
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, nickname: user.nickname },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return success(res, {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      token,
    }, '登录成功');

  } catch (err) {
    console.error('登录失败:', err);
    return error(res, '登录失败', 500);
  }
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser(req, res) {
  try {
    const { id } = req.user;
    const [users] = await db.query(
      'SELECT id, username, nickname, email, created_at FROM ev_users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return error(res, '用户不存在', 404);
    }

    return success(res, users[0], '获取用户信息成功');
  } catch (err) {
    console.error('获取用户信息失败:', err);
    return error(res, '获取用户信息失败', 500);
  }
}

/**
 * 修改密码
 */
export async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  try {
    // 查询当前用户密码
    const [users] = await db.query('SELECT password FROM ev_users WHERE id = ?', [id]);

    if (users.length === 0) {
      return error(res, '用户不存在', 404);
    }

    // 验证旧密码
    const isValid = await verifyPassword(oldPassword, users[0].password);
    if (!isValid) {
      return error(res, '旧密码错误', 400);
    }

    // 哈希新密码
    const hashedPassword = await hashPassword(newPassword);

    // 更新密码
    await db.query('UPDATE ev_users SET password = ? WHERE id = ?', [hashedPassword, id]);

    return success(res, null, '密码修改成功');
  } catch (err) {
    console.error('修改密码失败:', err);
    return error(res, '修改密码失败', 500);
  }
}