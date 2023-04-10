import { Pool } from "pg";

const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING || "";

const pool = new Pool({
  connectionString: POSTGRES_CONNECTION_STRING,
});

export const query = (text: string, params?: any) => pool.query(text, params);
