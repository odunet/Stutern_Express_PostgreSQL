const { pool } = require('../db');

const createDB = async (db) => {
  const data = await pool.query(`CREATE TABLE IF NOT EXISTS player(
        id serial PRIMARY KEY,
        name VARCHAR ( 50 ) UNIQUE NOT NULL,
        position VARCHAR ( 50 ) NOT NULL,
        imageID VARCHAR ( 255 ) UNIQUE NOT NULL,
        club VARCHAR ( 50 ) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`);
  console.log(data);
  await pool.end();
};

createDB(pool);
