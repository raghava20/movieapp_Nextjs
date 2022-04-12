import { Pool } from "pg";

let connection: any;

if (!connection) {
  connection = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "movieapp",
  });
}

export { connection };
