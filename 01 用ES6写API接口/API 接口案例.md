

![76059623477](G:\@HTML5\03 笔记\assets/1760596234772.png)

#1.案例需求

基于MySQL数据库+Express 对外提供用户列表的 API接口服务。用到的技术点如下：

- 第三方包 express 和 mysql
- ES6 模块化
- Promise
- async/await

# 2.实现步骤

①搭建项目的基本结构

②创建基本的服务器

③创建 db 数据库操作模块

④创建 user_ctrl 业务模块

⑤创建 user_router 路由模块

#3. 搭建基本结构

①命令只能在英文的目录下成功运行，英文名文件夹下初始化，npm init -y。

npm使用介绍：

| 命令                                  | 说明                                                       |
| ------------------------------------- | ---------------------------------------------------------- |
| `npm init`                            | 初始化一个新的 `package.json` 文件，交互式输入信息。       |
| `npm init -y`                         | 快速创建带有默认设置的 `package.json` 文件。               |
| `npm install package-name`            | 本地安装指定包。                                           |
| `npm install -g package-name`         | 全局安装指定包，使其在系统范围内可用。                     |
| `npm install`                         | 安装 `package.json` 中列出的所有依赖。                     |
| `npm install package-name --save-dev` | 安装包并添加到 `devDependencies`。                         |
| `npm update package-name`             | 更新指定的依赖包。                                         |
| `npm uninstall package-name`          | 卸载指定的依赖包。                                         |
| `npm uninstall -g package-name`       | 全局卸载指定的包。                                         |
| `npm list`                            | 查看当前项目的已安装依赖包列表。                           |
| `npm list -g --depth=0`               | 查看全局已安装的依赖包列表（不展开依赖树）。               |
| `npm info package-name`               | 查看包的详细信息，包括版本和依赖等。                       |
| `npm login`                           | 登录到 NPM 账号。                                          |
| `npm publish`                         | 发布当前包到 NPM 注册表。                                  |
| `npm unpublish package-name`          | 从 NPM 注册表中撤销发布的包（一般限 24 小时内）。          |
| `npm cache clean --force`             | 清理 NPM 缓存。                                            |
| `npm audit`                           | 检查项目依赖中的安全漏洞。                                 |
| `npm audit fix`                       | 自动修复已知的漏洞。                                       |
| `npm run script-name`                 | 运行 `package.json` 中定义的脚本，例如 `npm run start`。   |
| `npm start`                           | 运行 `start` 脚本（等同于 `npm run start`）。              |
| `npm test`                            | 运行 `test` 脚本。                                         |
| `npm build`                           | 运行 `build` 脚本。                                        |
| `npm outdated`                        | 列出项目中有可更新版本的依赖包。                           |
| `npm version patch/minor/major`       | 更新 `package.json` 中的版本号，自动更新版本。             |
| `npm ci`                              | 使用 `package-lock.json` 快速安装依赖，适用于 CI/CD 环境。 |

除了本章介绍的部分外，NPM 还提供了很多功能，package.json 里也有很多其它有用的字段。

除了可以在 <https://docs.npmjs.com/> 查看官方文档外，这里再介绍一些NPM常用命令。

②启用 ES6 模块化支持

- 在package.json 中声明 "type": "module"

  **package.json 的说明与使用**

  package.json 是 Node.js 项目中的一个核心文件，包含了项目的元数据、依赖、脚本等信息。

  package.json 文件用于描述项目的元数据和依赖关系，它通常位于项目的根目录中，并且是项目的配置文件。

  package.json 文件是一个 JSON 格式的文件，包含以下基本字段：

  - `name`：项目的名称，应该是唯一的，通常使用小写字母和连字符。
  - `version`：项目的版本号，遵循语义化版本控制（Semantic Versioning）。
  - `description`：项目的简短描述。
  - `main`：项目的入口文件，通常是应用程序的启动文件。
  - `scripts`：定义了一系列的命令行脚本，可以在项目中执行特定的任务。
  - `dependencies`：列出了项目运行所需的所有依赖包及其版本。
  - `devDependencies`：列出了只在开发过程中需要的依赖包及其版本。
  - `peerDependencies`：列出了项目期望其依赖包也依赖的包。
  - `optionalDependencies`：列出了可选的依赖包。
  - `engines`：指定了项目兼容的 Node.js 版本。
  - `repository`：项目的代码仓库信息，如 GitHub 仓库的 URL。
  - `keywords`：项目的关键词，有助于在 npm 搜索中找到项目。
  - `author`：项目的作者信息。
  - `license`：项目的许可证信息。

③安装第三方依赖包

- 运行npm  install  express  mysql2


# 4.创建 db 数据库操作模块

数据库错误调整，账号root，密码ecjtu007121

重新查找数据库信息。

**使用 MySQL Workbench 管理数据库（G:\@HTML5\01 哔哩哔哩pink课程\20260305 前后端交互\09_04_数据库与身份认证.pptx）**

1. 连接数据库，点击左下角MySQL Connections，如登录：账号root，密码ecjtu007121，进入主界面

2. 工具栏上点击创建数据库，填写数据库信息。注意数据库名字不能有中文及空格，用下划线代替空格。

3. tables栏上右键 creat table.输入数据表的名称uesrs、可选项，描述当前表的作用、设计表的字段、创建。

   DataType数据类型：

   ① int整数

   ② varchar(len)字符串

   ③ tinyint(1)布尔值

   字段的特殊标识：

   ① PK（PrimaryKey）主键、唯一标识

   ② NN（NotNull）值不允许为空

   ③ UQ（Unique）值唯一

   ④ AI（AutoIncrement）值自动增长

   状态status行，需设置默认值为0.

   ![77884023545](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1778840235454.png)

   ![77884027774](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1778840277741.png)

4. 向表中写入数据

   ![77884047889](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1778840478897.png)

   ![77884062065](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1778840620658.png)

5. ​其它，使用 SQL 管理数据库及在项目中操作 MySQL，使用 mysql 模块操作 MySQL 数据库，详ppt。

   安装 mysql 模块。在使用mysql模块操作MySQL数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

   ![77906948215](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1779069482158.png)


# 5.创建 user_ctrl 模块

错误代码显示如下：

node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

Error: Table 'my_db_01.ev_users' doesn't exist
    at getAllUser (file:///G:/@HTML5/project/Myproject/01%20%E7%94%A8ES6%E5%86%99API%E6%8E%A5%E5%8F%A3/code/controller/user_ctrl.js:4:27)
    at file:///G:/@HTML5/project/Myproject/01%20%E7%94%A8ES6%E5%86%99API%E6%8E%A5%E5%8F%A3/code/controller/user_ctrl.js:8:1
    at ModuleJob.run (node:internal/modules/esm/module_job:430:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:661:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
  code: 'ER_NO_SUCH_TABLE',
  errno: 1146,
  sqlState: '42S02',
  sqlMessage: "Table 'my_db_01.ev_users' doesn't exist",
  sql: 'select id, username, nickname from ev_users'
}

查找错误原因，为数据库缺失。使用 MySQL Workbench重新新建 MySQL。经过调试 MySQL，重新运行npm user_ctrl，打印出如下数据，与 MySQL 中数据一致：

![77884099202](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1778840992020.png)

如何获取数组里面的数据，用到结构数组。

变量的数量小于单元值数量时，可以通过什么剩余获取所有的值？
剩余参数..获取剩余单元值，但只能置于最末位。

使用ES6的按需导出语法,将getAllUser方法导出。

#6.创建 user_router 模块

**模块化**Express**路由**

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤如下：

①创建路由模块对应的 .js文件

②调用 express.Router()函数创建路由对象

③向路由对象上挂载具体的路由

④使用 module.exports 向外共享路由对象

⑤使用 app.use()函数注册路由模块

# 7.导入并挂载路由模块

**注册路由模块，挂载用户路由模块**

引入用户路由模块,默认导入语法。

~~~javascript
import userRouter from './router/user_router.js'
~~~



挂载用户路由模块，使用app.use()方法注册路由，并指定路由前缀为/api。

~~~javascript
app.use('/api', userRouter)
~~~

保存，并nodemon  app.js，postman测试，显示如下。

![77900653466](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1779006534667.png)

# 8.使用 try…catch 捕获异常

使用try...catch语句，捕获Promise对象异步操作中的数据库操作中的异常，并在catch语句中处理异常信息。

执行SQL语句，获取用户列表,xxx字段是测试字段  ,ev_users表中没有xxx字段，所以sql语句会报错。

~~~javascript
export async function getAllUser(req, res) {  
  try {   
    const [rows] = await db.query('select id, username, nickname, xxx from ev_users')
    console.log(rows)
    res.send({
      status: 0,
      message: '获取用户列表成功',
      data: rows
    })
  } catch (err) {
    console.log(err)
    res.send({
      status: 1,
      message: '获取用户列表失败',
      data: err.message
    })
  }
}

~~~

终端显示如下错误：Error: Unknown column 'xxx' in 'field list'

![77900742479](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1779007424793.png)

postman测试显示错误提示信息：

![77900754587](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1779007545873.png)

**在目前的现代前端开发中，axios 是最常用的（特别是复杂项目），fetch（ES6 原生）正变得越来越常用，而 XMLHttpRequest Level 2 已经很少直接使用了。**

![77901023078](G:\@HTML5\project\Myproject\01 用ES6写API接口\assets\1779010230787.png)

# 9.优化完善

在原有基础上进行了**完整扩展**，增加了以下功能：

- **密码加密**（使用 `bcryptjs`）
- **JWT 身份认证**（使用 `jsonwebtoken`）
- **用户注册、登录、更新、删除**
- **权限中间件**（验证 Token）
- **密码修改**
- **统一错误处理中间件**

## 更新 package.json/安装新增依赖

json

```
{
  "name": "my-api-project",
  "version": "2.0.0",
  "description": "完整的用户 API 系统（含 JWT 认证）",
  "main": "app.js",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**安装新增依赖**

bash

```
npm install express mysql2 jsonwebtoken bcryptjs dotenv cors helmet express-rate-limit
npm install --save-dev nodemon
```

## 更新后的项目结构

text

```
my-api-project/
├── package.json
├── app.js
├── config/
│   └── config.js          # 配置文件（密钥等）
├── db/
│   └── db.js              # 数据库连接
├── middleware/
│   ├── auth.js            # JWT 认证中间件
│   └── validation.js      # 参数验证中间件
├── controller/
│   ├── user_ctrl.js       # 用户业务逻辑
│   └── auth_ctrl.js       # 认证业务逻辑
├── router/
│   ├── user_router.js     # 用户路由
│   └── auth_router.js     # 认证路由
└── utils/
    ├── password.js        # 密码加密工具
    └── response.js        # 统一响应工具
```

## 创建环境变量文件 .env

env

```
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=ecjtu007121
DB_NAME=my_db_01

# JWT 配置
JWT_SECRET=your-super-secret-key-2026
JWT_EXPIRES_IN=7d

# 密码加密
BCRYPT_SALT_ROUNDS=10
```

## 配置文件

 `config/config.js`

javascript

```
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'ecjtu007121',
    database: process.env.DB_NAME || 'my_db_01',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
};
```

## utils/password.js（密码加密工具）

javascript

```
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
```

## utils/response.js（统一响应工具）

javascript

```
/**
 * 统一成功响应
 */
export function success(res, data = null, message = '操作成功', statusCode = 200) {
  return res.status(statusCode).json({
    status: 0,
    message,
    data,
  });
}

/**
 * 统一错误响应
 */
export function error(res, message = '操作失败', statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    status: 1,
    message,
    errors,
  });
}

/**
 * 统一分页响应
 */
export function paginate(res, data, total, page = 1, pageSize = 10) {
  return res.status(200).json({
    status: 0,
    message: '获取成功',
    data,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}
```

## middleware/auth.js（JWT 认证中间件）

javascript

```
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
```

##  middleware/validation.js（参数验证中间件）

javascript

```
import { error } from '../utils/response.js';

/**
 * 验证请求体中的必填字段
 * @param {string[]} fields - 必填字段列表
 */
export function validateRequired(fields = []) {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of fields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return error(res, `缺少必填字段: ${missingFields.join(', ')}`, 400);
    }

    next();
  };
}

/**
 * 验证用户 ID 是否为有效数字
 */
export function validateUserId(req, res, next) {
  const { id } = req.params;
  const userId = parseInt(id);

  if (isNaN(userId) || userId <= 0) {
    return error(res, '无效的用户 ID', 400);
  }

  req.params.id = userId;
  next();
}

/**
 * 验证分页参数
 */
export function validatePagination(req, res, next) {
  let { page = 1, pageSize = 10 } = req.query;

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
    pageSize = 10;
  }

  req.query.page = page;
  req.query.pageSize = pageSize;
  next();
}
```

## controller/auth_ctrl.js（认证业务逻辑）

javascript

```
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
```

## controller/user_ctrl.js（用户业务逻辑扩展）

javascript

```
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
```

## router/auth_router.js（认证路由）

javascript

```
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
```

## router/user_router.js（用户路由扩展）

javascript

```
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
```

## db/db.js 修正版

```
import mysql from 'mysql2/promise';

// 创建数据库连接池
const db = mysql.createPool({
  host: 'localhost',       // ✅ 正确：不要加 http://
  user: 'root',            // 您的数据库用户名
  password: 'ecjtu007121', // 您的数据库密码
  database: 'my_db_01',    // 您的数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('✅ 数据库连接成功');
    connection.release();
  } catch (err) {
    console.error('❌ 数据库连接失败:', err.message);
    // 打印更详细的错误信息
    console.error('错误详情:', err);
  }
}

testConnection();

export default db;
```

## app.js（主服务器入口 - 更新版）

javascript

```
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
```

## 数据库更新 SQL（增加字段）

sql

```
USE my_db_01;

-- 增加 email 字段
ALTER TABLE ev_users ADD COLUMN email VARCHAR(100) DEFAULT '' COMMENT '邮箱';

-- 增加 role 字段（用于权限控制）
ALTER TABLE ev_users ADD COLUMN role VARCHAR(20) DEFAULT 'user' COMMENT '角色: user/admin';

-- 更新管理员账号
UPDATE ev_users SET role = 'admin' WHERE username = 'admin';

-- 增加唯一索引
CREATE UNIQUE INDEX idx_username ON ev_users(username);
```

## 完整接口文档（Postman）

### 认证接口

| 方法 | URL                         | 描述             | 认证 |
| ---- | --------------------------- | ---------------- | ---- |
| POST | `/api/auth/register`        | 注册新用户       | 否   |
| POST | `/api/auth/login`           | 用户登录         | 否   |
| GET  | `/api/auth/me`              | 获取当前用户信息 | 是   |
| POST | `/api/auth/change-password` | 修改密码         | 是   |

### 用户接口

| 方法   | URL              | 描述                      | 认证       |
| ------ | ---------------- | ------------------------- | ---------- |
| GET    | `/api/users`     | 获取用户列表（分页+搜索） | 否         |
| GET    | `/api/users/:id` | 获取单个用户              | 是         |
| POST   | `/api/users`     | 新增用户                  | 是 (admin) |
| PUT    | `/api/users/:id` | 更新用户                  | 是 (admin) |
| DELETE | `/api/users/:id` | 删除用户                  | 是 (admin) |
| DELETE | `/api/users`     | 批量删除用户              | 是 (admin) |

## 测试用例（Postman）

### 注册

json

```
POST /api/auth/register
{
  "username": "testuser",
  "password": "123456",
  "nickname": "测试用户",
  "email": "test@example.com"
}
```

### 登录

json

```
POST /api/auth/login
{
  "username": "testuser",
  "password": "123456"
}
```

### 获取当前用户

text

```
GET /api/auth/me
Authorization: Bearer <token>
```

### 获取用户列表（带搜索和分页）

text

```
GET /api/users?keyword=admin&page=1&pageSize=10
```

### 新增用户（管理员）

json

```
POST /api/users
Authorization: Bearer <admin_token>
{
  "username": "newuser",
  "password": "123456",
  "nickname": "新用户",
  "email": "new@example.com",
  "status": 0
}
```

### 更新用户（管理员）

json

```
PUT /api/users/1
Authorization: Bearer <admin_token>
{
  "nickname": "管理员更新",
  "status": 1
}
```

### 删除用户（管理员）

text

```
DELETE /api/users/1
Authorization: Bearer <admin_token>
```

### 批量删除用户（管理员）

json

```
DELETE /api/users
Authorization: Bearer <admin_token>
{
  "ids": [2, 3, 4]
}
```

## 旧-完整使用流程

### 步骤 1：安装依赖

bash

```
npm install express mysql2 bcryptjs jsonwebtoken nodemon
```

### 步骤 2：创建数据库表（包含新字段）

sql

```
CREATE DATABASE IF NOT EXISTS my_db_01;
USE my_db_01;

CREATE TABLE IF NOT EXISTS ev_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  nickname VARCHAR(50) DEFAULT '',
  password VARCHAR(255) NOT NULL,
  status TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 步骤 3：启动服务器

bash

```
npm run dev
```

### 步骤 4：测试流程

1. **注册** → POST `/api/auth/register`

2. **登录** → POST `/api/auth/login` → 获取 Token

3. **使用 Token** 访问受保护接口：

   - 在 Postman 的 Headers 中添加：

     text

     ```
     Authorization: Bearer <你的token>
     ```

     ​

     ​

4. **获取个人信息** → GET `/api/auth/profile`

5. **更新用户** → PUT `/api/users/1`

6. **修改密码** → PUT `/api/password`

## 安全注意事项（生产环境）

| 特性         | 实现方式                      |
| ------------ | ----------------------------- |
| **密码加密** | bcryptjs（加盐哈希）          |
| **JWT 认证** | jsonwebtoken（过期时间+签名） |
| **权限控制** | 基于角色的授权中间件          |
| **请求限流** | express-rate-limit            |
| **安全头**   | helmet                        |
| **CORS**     | cors 中间件                   |
| **参数验证** | 自定义验证中间件              |
| **错误处理** | 全局错误中间件 + 统一响应格式 |
| **环境变量** | dotenv 管理敏感配置           |

# 10.拓展HTTP响应状态码

| 分类 | 分类描述                                                     |
| ---- | ------------------------------------------------------------ |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作（实际开发中很少遇到  1**  类型的状态码） |
| 2**  | 成功，操作被成功接收并处理                                   |
| 3**  | 重定向，需要进一步的操作以完成请求                           |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求                   |
| 5**  | 服务器错误，服务器在处理请求的过程中发生了错误               |

## . 2**成功相关的响应状态码

| 状态码 | 状态码英文名称 | 中文描述                                                     |
| ------ | -------------- | ------------------------------------------------------------ |
| 200    | OK             | 请求成功。一般用于  GET 与 POST  请求                        |
| 201    | Created        | 已创建。成功请求并创建了新的资源，通常用于  POST 或 PUT  请求 |

##3**重定向相关的响应状态码

| 状态码 | 状态码英文名称     | 中文描述                                                     |
| ------ | ------------------ | ------------------------------------------------------------ |
| 301    | Moved  Permanently | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found              | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 304    | Not  Modified      | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源（响应消息中不包含响应体）。客户端通常会缓存访问过的资源。 |

##4**客户端错误相关的响应状态码

| 状态码 | 状态码英文名称   | 中文描述                                                     |
| ------ | ---------------- | ------------------------------------------------------------ |
| 400    | Bad  Request     | 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。  2、请求参数有误。 |
| 401    | Unauthorized     | 当前请求需要用户验证。                                       |
| 403    | Forbidden        | 服务器已经理解请求，但是拒绝执行它。                         |
| 404    | Not Found        | 服务器无法根据客户端的请求找到资源（网页）。                 |
| 408    | Request  Timeout | 请求超时。服务器等待客户端发送的请求时间过长，超时。         |

## 5**服务端错误相关的响应状态码

| 状态码 | 状态码英文名称         | 中文描述                                                     |
| ------ | ---------------------- | ------------------------------------------------------------ |
| 500    | Internal  Server Error | 服务器内部错误，无法完成请求。                               |
| 501    | Not  Implemented       | 服务器不支持该请求方法，无法完成请求。只有  GET 和 HEAD  请求方法是要求每个服务器必须支持的，其它请求方法在不支持的服务器上会返回501 |
| 503    | Service  Unavailable   | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。       |







