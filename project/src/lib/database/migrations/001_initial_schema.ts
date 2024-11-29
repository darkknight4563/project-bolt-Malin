import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

export async function up(pool: Pool): Promise<void> {
  const schemaSQL = fs.readFileSync(
    path.join(__dirname, '../schema.sql'),
    'utf8'
  );

  try {
    await pool.query('BEGIN');
    await pool.query(schemaSQL);
    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
}

export async function down(pool: Pool): Promise<void> {
  try {
    await pool.query('BEGIN');
    
    // Drop tables in reverse order to handle dependencies
    await pool.query(`
      DROP TABLE IF EXISTS appointments;
      DROP TABLE IF EXISTS therapists;
      DROP TABLE IF EXISTS audit_logs;
      DROP TABLE IF EXISTS medical_records;
      DROP TABLE IF EXISTS sessions;
      DROP TABLE IF EXISTS users;
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);
    
    await pool.query('COMMIT');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
}