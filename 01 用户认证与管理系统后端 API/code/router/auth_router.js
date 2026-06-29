import express from 'express';
import { register, login, getCurrentUser, changePassword } from '../controller/auth_ctrl.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequired } from '../middleware/validation.js';

const router = express.Router();

// 注册
router.post('/register', validateRequired(['username', 'password']), register);

// 登录
router.post('/login', validateRequired(['username', 'password']), login);

// 获取当前用户信息（需要认证）
router.get('/me', authenticateToken, getCurrentUser);

// 修改密码（需要认证）
router.post('/change-password', authenticateToken, validateRequired(['oldPassword', 'newPassword']), changePassword);

export default router;