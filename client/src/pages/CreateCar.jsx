import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { calcCarPrice } from "../utils/price.js";
import carsAPI from "../services/carsAPI.js";
import CarSummary from "../components/CarSummary.jsx";
import CarEditor from "../components/CarEditor.jsx";

const CreateCar = () => {
  const navigate = useNavigate();
  const defaultCar = { isConvertible: false, name: "" };

  const [car, setCar] = useState(defaultCar);

  car.price = calcCarPrice(car);

  const onUpdate = (updates) => {
    setCar({ ...car, ...updates });
  };

  const onSubmit = () => {
    carsAPI.createCar(car);
    navigate("customcars");
  };

  return (
    <div className="container">
      <article>
        <h2>Create a car:</h2>

        <CarEditor updateCar={onUpdate} submitCar={onSubmit} {...car} />

        <CarSummary {...car} />
      </article>
    </div>
  );
};

export default CreateCar;
