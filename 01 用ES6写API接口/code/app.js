import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './router/auth_router.js';
import userRouter from './router/user_router.js';
import { config } from './config/config.js';

const app = express();

// ===== 安全中间件 =====
// 启用 CORS
app.use(cors());

// 启用 Helmet（安全头）
app.use(helmet());

// 限流中间件（防止暴力攻击）
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 每个 IP 15 分钟内最多 100 次请求
  message: '请求过于频繁，请稍后再试',
});
app.use(limiter);

// ===== 请求解析中间件 =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== 路由 =====
// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 认证路由
app.use('/api/auth', authRouter);

// 用户路由
app.use('/api', userRouter);

// ===== 404 处理 =====
app.use('*', (req, res) => {
  res.status(404).json({
    status: 1,
    message: '接口不存在',
  });
});

// ===== 全局错误处理中间件 =====
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    status: 1,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ===== 启动服务器 =====
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📌 环境: ${config.server.env}`);
  console.log(`🔐 JWT 过期时间: ${config.jwt.expiresIn}`);
});