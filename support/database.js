import { Pool } from 'pg';

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'zombieplus',
  password: 'pwd123',
  port: 5432
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