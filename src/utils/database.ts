import { Pool } from "pg";

let connection: any;

if (!connection) {
  connection = new Pool({
    user: "postgres",
    password: "postgres123!",
    host: "localhost",
    port: 5432,
    database: "movieapp",
  });
}

export { connection };
