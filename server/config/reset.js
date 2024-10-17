import { pool } from "./database.js";

import roofsData from "./data/roofs.js";
import wheelsData from "./data/wheels.js";
import exteriorsData from "./data/exteriors.js";
import interiorsData from "./data/interiors.js";
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

const seedRoofsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL,
      is_convertible BOOLEAN NOT NULL
  `;

  await createTable("roofs", schema);

  roofsData.forEach((roof) => {
    const query =
      "INSERT INTO roofs (color, image, price, is_convertible) VALUES ($1, $2, $3, $4)";
    const values = [roof.color, roof.image, roof.price, roof.isConvertible];

    pool.query(query, values, (err, _res) => {
      if (err) {
        console.error("⚠️ error inserting roof", err);
        return;
      }

      console.log(`✅ roof ${roof.id} added successfully`);
    });
  });
};

const seedWheelsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL
  `;

  await createTable("wheels", schema);

  wheelsData.forEach((wheel) => {
    const query =
      "INSERT INTO wheels (color, image, price) VALUES ($1, $2, $3)";
    const values = [wheel.color, wheel.image, wheel.price];

    pool.query(query, values, (err, _res) => {
      if (err) {
        console.error("⚠️ error inserting wheel", err);
        return;
      }

      console.log(`✅ wheel ${wheel.id} added successfully`);
    });
  });
};

const seedExteriorsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL
  `;

  await createTable("exteriors", schema);

  exteriorsData.forEach((exterior) => {
    const query =
      "INSERT INTO exteriors (color, image, price) VALUES ($1, $2, $3)";
    const values = [exterior.color, exterior.image, exterior.price];

    pool.query(query, values, (err, _res) => {
      if (err) {
        console.error("⚠️ error inserting exterior", err);
        return;
      }

      console.log(`✅ exterior ${exterior.id} added successfully`);
    });
  });
};

const seedInteriorsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL
  `;

  await createTable("interiors", schema);

  interiorsData.forEach((interior) => {
    const query =
      "INSERT INTO interiors (color, image, price) VALUES ($1, $2, $3)";
    const values = [interior.color, interior.image, interior.price];

    pool.query(query, values, (err, _res) => {
      if (err) {
        console.error("⚠️ error inserting interior", err);
        return;
      }

      console.log(`✅ interior ${interior.id} added successfully`);
    });
  });
};

const seedCarsTable = async () => {
  const schema = `
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      is_convertible BOOLEAN NOT NULL,
      roof INTEGER REFERENCES roofs (id),
      wheels INTEGER REFERENCES wheels (id),
      exterior INTEGER REFERENCES exteriors (id),
      interior INTEGER REFERENCES interiors (id)
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

await seedRoofsTable();
await seedWheelsTable();
await seedExteriorsTable();
await seedInteriorsTable();
await seedCarsTable();
