import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'my_db_01',//填写数据库名称
  user: 'root',//填写数据库用户名
  password: 'ecjtu007121',//填写数据库密码
})
// 导出数据库连接池,默认导出一个支持promise api的连接池
export default pool.promise()
