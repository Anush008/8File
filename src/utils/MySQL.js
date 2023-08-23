import mysql from 'mysql2';
const connection = mysql.createConnection({
  uri: process.env.PLANETSCALE_PRISMA_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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
