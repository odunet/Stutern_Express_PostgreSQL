//Initialize postgress DB
const { Pool, Client } = require('pg');
require('dotenv').config();

exports.pool = new Pool();
