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