import db from '../db/db.js';
import { success, error, paginate } from '../utils/response.js';
import { hashPassword } from '../utils/password.js';

/**
 * 获取所有用户列表（支持分页和搜索）
 */
export async function getAllUser(req, res) {
  const { page = 1, pageSize = 10, keyword = '' } = req.query;

  try {
    // 计算偏移量
    const offset = (page - 1) * pageSize;

    // 构建查询条件
    let whereClause = '';
    let params = [];

    if (keyword) {
      whereClause = 'WHERE username LIKE ? OR nickname LIKE ?';
      params = [`%${keyword}%`, `%${keyword}%`];
    }

    // 查询总数
    const [totalResult] = await db.query(
      `SELECT COUNT(*) as total FROM ev_users ${whereClause}`,
      params
    );
    const total = totalResult[0].total;

    // 查询数据
    const [rows] = await db.query(
      `SELECT id, username, nickname, email, status, created_at 
       FROM ev_users ${whereClause} 
       ORDER BY id DESC 
       LIMIT ? OFFSET ?`,
      [...params, parseInt(pageSize), parseInt(offset)]
    );

    return paginate(res, rows, total, parseInt(page), parseInt(pageSize));
  } catch (err) {
    console.error('获取用户列表失败:', err);
    return error(res, '获取用户列表失败', 500);
  }
}

/**
 * 根据 ID 获取单个用户
 */
export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT id, username, nickname, email, status, created_at FROM ev_users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return error(res, '用户不存在', 404);
    }

    return success(res, rows[0], '获取用户成功');
  } catch (err) {
    console.error('获取用户失败:', err);
    return error(res, '获取用户失败', 500);
  }
}

/**
 * 新增用户（管理员）
 */
export async function addUser(req, res) {
  const { username, password, nickname, email, status = 0 } = req.body;

  if (!username || !password) {
    return error(res, '用户名和密码不能为空', 400);
  }

  try {
    // 检查用户名是否已存在
    const [existing] = await db.query('SELECT id FROM ev_users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return error(res, '用户名已被使用', 409);
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password);

    const [result] = await db.query(
      'INSERT INTO ev_users (username, password, nickname, email, status) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, nickname || '', email || '', status]
    );

    return success(res, {
      id: result.insertId,
      username,
      nickname: nickname || '',
      email: email || '',
      status,
    }, '添加用户成功', 201);
  } catch (err) {
    console.error('添加用户失败:', err);
    return error(res, '添加用户失败', 500);
  }
}

/**
 * 更新用户信息
 */
export async function updateUser(req, res) {
  const { id } = req.params;
  const { nickname, email, status } = req.body;

  try {
    // 检查用户是否存在
    const [existing] = await db.query('SELECT id FROM ev_users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return error(res, '用户不存在', 404);
    }

    // 构建更新字段
    const updates = [];
    const params = [];

    if (nickname !== undefined) {
      updates.push('nickname = ?');
      params.push(nickname);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length === 0) {
      return error(res, '没有提供要更新的字段', 400);
    }

    // 添加 WHERE 条件
    params.push(id);

    await db.query(
      `UPDATE ev_users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    return success(res, { id, nickname, email, status }, '更新用户成功');
  } catch (err) {
    console.error('更新用户失败:', err);
    return error(res, '更新用户失败', 500);
  }
}

/**
 * 删除用户
 */
export async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    // 检查用户是否存在
    const [existing] = await db.query('SELECT id FROM ev_users WHERE id = ?', [id]);
    if (existing.length === 0) {
      return error(res, '用户不存在', 404);
    }

    // 删除用户
    await db.query('DELETE FROM ev_users WHERE id = ?', [id]);

    return success(res, { id }, '删除用户成功');
  } catch (err) {
    console.error('删除用户失败:', err);
    return error(res, '删除用户失败', 500);
  }
}

/**
 * 批量删除用户
 */
export async function deleteUsers(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return error(res, '请提供有效的用户 ID 列表', 400);
  }

  try {
    // 构建占位符
    const placeholders = ids.map(() => '?').join(',');

    // 删除用户
    const [result] = await db.query(
      `DELETE FROM ev_users WHERE id IN (${placeholders})`,
      ids
    );

    return success(res, { deletedCount: result.affectedRows }, `删除 ${result.affectedRows} 个用户成功`);
  } catch (err) {
    console.error('批量删除用户失败:', err);
    return error(res, '批量删除用户失败', 500);
  }
}