import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CarSummary from "../components/CarSummary";
import carsAPI from "../services/carsAPI";

const CarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [car, setCar] = useState({});

  const id = location.pathname.split("/").pop();

  const deleteCar = () => {
    carsAPI.deleteCar(car);
    navigate("/customcars");
  };

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

  return (
    <div className="container">
      <article>
        <CarSummary {...car} />
        <Link to={`/edit/${car.id}`}>Edit</Link>
        <button onClick={deleteCar}>Delete</button>
      </article>
    </div>
  );
};

export default CarDetails;
