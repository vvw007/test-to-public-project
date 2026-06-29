// 使用默认导入语法，导入语法：import 导入的变量名 from 模块路径/模块名
import express from 'express';
// 引入用户路由模块
import userRouter from './router/user_router.js'
const app = express();
// 挂载用户路由模块，使用app.use()方法注册路由，并指定路由前缀为/api。
app.use('/api', userRouter)
// 启动服务器，监听端口80
app.listen(80, () => {
  console.log('server is running at http://127.0.0.1')
})
