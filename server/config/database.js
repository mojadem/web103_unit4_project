import pg from "pg";

const config = {
  connectionString: process.env.CONNECTION_STRING,
};

export const pool = new pg.Pool(config);
