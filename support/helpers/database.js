require('dotenv').config();
import { Pool } from 'pg';

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
}

export async function executeSQL(sqlScript) {
  try {
    const pool = new Pool(dbConfig);
    const client = await pool.connect();
    const result = await client.query(sqlScript);
    return result;
  } catch (error) {
    console.log('[ERROR] Failed when executing SQL: ' + error);
  }
}