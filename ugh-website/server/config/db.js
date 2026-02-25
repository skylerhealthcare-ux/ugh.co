// Neon PostgreSQL Connection Configuration
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://username:password@host:5432/ughbags',
    ssl: {
        rejectUnauthorized: false // Required for Neon DB
    }
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('PostgreSQL Connected Successfully');
        client.release();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Continue with local fallback data if DB connection fails
        console.log('Using local data as fallback');
    }
};

// Helper function to run queries
const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
};

module.exports = { connectDB, query, pool };
