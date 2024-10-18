import { pool } from "./database.js";

import carsData from "./data/cars.js";

const dropTable = async (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName};`;

  try {
    await pool.query(query);
    console.log(`🎉 ${tableName} table dropped successfully`);
  } catch (err) {
    console.error(`⚠️ error dropping ${tableName} table`, err);
  }
};

const createTable = async (tableName, schema) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${schema}
    )
  `;

  try {
    await pool.query(query);
    console.log(`🎉 ${tableName} table created successfully`);
  } catch (err) {
    console.error(`⚠️ error creating ${tableName} table`, err);
  }
};

const seedCarsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      is_convertible BOOLEAN NOT NULL,
      roof INTEGER NOT NULL,
      wheels INTEGER NOT NULL,
      exterior INTEGER NOT NULL,
      interior INTEGER NOT NULL
  `;

  await createTable("cars", schema);

  carsData.forEach((car) => {
    const query =
      "INSERT INTO cars (name, price, is_convertible, roof, wheels, exterior, interior) VALUES ($1, $2, $3, $4, $5, $6, $7);";

    const values = [
      car.name,
      car.price,
      car.isConvertible,
      car.roof,
      car.wheels,
      car.exterior,
      car.interior,
    ];

    pool.query(query, values, (err, _res) => {
      if (err) {
        console.error("⚠️ error inserting interior", err);
        return;
      }

      console.log(`✅ car ${car.id} added successfully`);
    });
  });
};

await dropTable("cars");
await dropTable("roofs");
await dropTable("wheels");
await dropTable("exteriors");
await dropTable("interiors");

await seedCarsTable();
