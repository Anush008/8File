import mysql from 'mysql2';
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE_NAME,
    password: process.env.MYSQL_PASSWORD,
  });

//Promisify the execute()
const execute = async (query, params) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results, fields) => {
      if (err) reject(err);
      else resolve(results);
    });
})}
export default execute;
