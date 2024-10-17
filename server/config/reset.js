import { pool } from "./database.js";

import roofsData from "./data/roofs.js";
import wheelsData from "./data/wheels.js";
import exteriorsData from "./data/exteriors.js";
import interiorsData from "./data/interiors.js";
import carsData from "./data/cars.js";

const createTable = async (tableName, schema) => {
  const query = `
    DROP TABLE IF EXISTS ${tableName};

    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${schema}
    )
  `;

  try {
    const res = await pool.query(query);
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
    const insertQuery = {
      text: "INSERT INTO roofs (color, image, price, is_convertible) VALUES ($1, $2, $3, $4)",
    };

    const values = [roof.color, roof.image, roof.price, roof.isConvertible];

    pool.query(insertQuery, values, (err, res) => {
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
    const insertQuery = {
      text: "INSERT INTO wheels (color, image, price) VALUES ($1, $2, $3)",
    };

    const values = [wheel.color, wheel.image, wheel.price];

    pool.query(insertQuery, values, (err, res) => {
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
    const insertQuery = {
      text: "INSERT INTO exteriors (color, image, price) VALUES ($1, $2, $3)",
    };

    const values = [exterior.color, exterior.image, exterior.price];

    pool.query(insertQuery, values, (err, res) => {
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
    const insertQuery = {
      text: "INSERT INTO interiors (color, image, price) VALUES ($1, $2, $3)",
    };

    const values = [interior.color, interior.image, interior.price];

    pool.query(insertQuery, values, (err, res) => {
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
      wheel INTEGER REFERENCES wheels (id),
      exterior INTEGER REFERENCES exteriors (id),
      interior INTEGER REFERENCES interiors (id)
  `;

  await createTable("cars", schema);

  carsData.forEach((car) => {
    const query =
      "INSERT INTO cars (name, price, is_convertible, roof, wheel, exterior, interior) VALUES ($1, $2, $3, $4, $5, $6, $7);";

    const values = [
      car.name,
      car.price,
      car.isConvertible,
      car.roof,
      car.wheel,
      car.exterior,
      car.interior,
    ];

    pool.query(query, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting interior", err);
        return;
      }

      console.log(`✅ car ${car.id} added successfully`);
    });
  });
};

seedRoofsTable();
seedWheelsTable();
seedExteriorsTable();
seedInteriorsTable();
seedCarsTable();
