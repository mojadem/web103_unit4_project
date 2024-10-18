import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { calcCarPrice } from "../utils/price.js";
import carsAPI from "../services/carsAPI.js";
import CarSummary from "../components/CarSummary.jsx";
import CarEditor from "../components/CarEditor.jsx";

const EditCar = () => {
  const navigate = useNavigate();
  const defaultCar = { isConvertible: false, name: "" };
  const [car, setCar] = useState(defaultCar);

  const id = location.pathname.split("/").pop();

  useEffect(() => {
    (async () => {
      try {
        const carData = await carsAPI.getCar(id);
        setCar(carData);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  car.price = calcCarPrice(car);

  const onUpdate = (updates) => {
    setCar({ ...car, ...updates });
  };

  const onSubmit = () => {
    carsAPI.updateCar(car);
    navigate(`/customcars/${car.id}`);
  };

  const deleteCar = () => {
    carsAPI.deleteCar(car);
    navigate("/customcars");
  };

  return (
    <div className="container">
      <article>
        <h2>Edit car:</h2>

        <CarEditor updateCar={onUpdate} submitCar={onSubmit} {...car} />

        <CarSummary {...car} />

        <button onClick={deleteCar}>Delete</button>
      </article>
    </div>
  );
};

export default EditCar;
