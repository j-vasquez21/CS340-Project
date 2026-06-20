import { Pool } from 'pg';
import 'dotenv/config';

// create a new pool instance to manage database connections

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // connections management 
    max: 15,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    client.release();
}
catch (err) {
    console.error('Error connecting to the database:', err);
}

export default pool;