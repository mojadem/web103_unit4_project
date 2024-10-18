import React, { useEffect, useState } from "react";
import "../App.css";

import carsAPI from "../services/carsAPI";
import CarSummary from "../components/CarSummary";
import { Link } from "react-router-dom";

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
    <div className="container">
      {cars.map((car) => (
        <article key={car.id}>
          <h2>{car.name}</h2>
          <CarSummary {...car} />
          <Link to={`${car.id}`}>Details</Link>
        </article>
      ))}
    </div>
  );
};

export default ViewCars;
