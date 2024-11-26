require('dotenv').config(); // Load .env variables into process.env

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DB_URI // Replace with your Supabase connection string
});

client.connect()
    .then(() => {
        console.log('Connected to Supabase PostgreSQL database');
        return client.query('SELECT NOW() AS "currentTime"');
    })
    .then(result => {
        console.log('Current Time:', result.rows[0].currentTime);
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    })
    .finally(() => {
        client.end();
    });