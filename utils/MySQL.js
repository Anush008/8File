import mysql from 'mysql2';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

//Promisify the execute function
const execute = async (query, params) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results, fields) => {
      if (err) reject(err);
      else resolve(results);
    });
})}
export default execute;
