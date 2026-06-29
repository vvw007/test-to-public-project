import db from '../db/index.js'

// 使用ES6的按需导出语法,将getAllUser方法导出
export async function getAllUser(req, res) {
  // db.query()函数的返回值是Promise的实例对象。因此，可以使用async/await进行简化
  // 使用try...catch语句，捕获Promise对象异步操作中的数据库操作中的异常，并在catch语句中处理异常信息
  try {
    // 执行SQL语句，获取用户列表,xxx字段是测试字段  ,ev_users表中没有xxx字段，所以sql语句会报错
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

// getAllUser()