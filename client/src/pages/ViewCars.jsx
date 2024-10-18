import React, { useEffect, useState } from "react";
import "../App.css";

import carsAPI from "../services/carsAPI";

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const carsData = await carsAPI.getCars();
        setCars(carsData);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  return (
    <div class="container">
      {cars.map((car) => (
        <article key={car.id}>
          <h2>{car.name}</h2>
          <ul></ul>
        </article>
      ))}
    </div>
  );
};

export default ViewCars;
