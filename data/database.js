const mysql = require('mysql2/promise');

const pool = mysql.createPool({
   database: 'file_upload_project',
   host:'127.0.0.1',
   port: 3306,
   password: 'Player.123',
   user:'root',
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
})

async function getDb() {
  if (!pool) {
    throw { message: 'Database not connected!' };
  }
  else{
    console.log('Database connected!');
    return await pool.getConnection();
  }
  
}

module.exports = { pool, getDb };