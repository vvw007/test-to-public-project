import express from 'express';
import {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  deleteUsers
} from '../controller/user_ctrl.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validateRequired, validateUserId, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// 公开路由（不需要认证）
// 获取所有用户列表（支持分页和搜索）
router.get('/users', validatePagination, getAllUser);

// 需要认证的路由
// 获取单个用户
router.get('/users/:id', validateUserId, getUserById);

// 添加用户（需要认证 + 管理员权限）
router.post(
  '/users',
  authenticateToken,
  authorizeRoles(['admin']),
  validateRequired(['username', 'password']),
  addUser
);

// 更新用户（需要认证 + 管理员权限）
router.put(
  '/users/:id',
  authenticateToken,
  authorizeRoles(['admin']),
  validateUserId,
  updateUser
);

// 删除用户（需要认证 + 管理员权限）
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRoles(['admin']),
  validateUserId,
  deleteUser
);

// 批量删除用户（需要认证 + 管理员权限）
router.delete(
  '/users',
  authenticateToken,
  authorizeRoles(['admin']),
  deleteUsers
);

export default router;