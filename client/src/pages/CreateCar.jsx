import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import wheels from "../data/wheels.js";
import roofs from "../data/roofs.js";
import interiors from "../data/interiors.js";
import exteriors from "../data/exteriors.js";
import { getInterior, getExterior, getRoof, getWheels } from "../utils/data.js";
import { calcCarPrice } from "../utils/price.js";
import carsAPI from "../services/carsAPI.js";

const CreateCar = () => {
  const navigate = useNavigate();

  const defaultCar = { isConvertible: false, name: "" };

  const [car, setCar] = useState(defaultCar);

  car.price = calcCarPrice(car);

  const isConvertible = car.isConvertible;
  const selectedInterior = car.interior ? getInterior(car.interior) : undefined;
  const selectedExterior = car.exterior ? getExterior(car.exterior) : undefined;
  const selectedRoof = car.roof ? getRoof(car.roof) : undefined;
  const selectedWheels = car.wheels ? getWheels(car.wheels) : undefined;

  const validRoofs = roofs.filter((roof) => {
    if (isConvertible) {
      return roof.isConvertible;
    }

    return true;
  });

  const isCarValid =
    "name" in car &&
    car.name !== "" &&
    "isConvertible" in car &&
    "interior" in car &&
    "exterior" in car &&
    "roof" in car &&
    "wheels" in car;

  const submitCar = () => {
    carsAPI.createCar(car);
    navigate("customcars");
  };

  return (
    <div className="container">
      <article>
        <h2>Create a car:</h2>
        <form>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              onChange={(event) => {
                setCar({ ...car, name: event.target.value });
              }}
            />
          </label>

          <label>
            Covertible
            <input
              type="checkbox"
              name="convertible"
              role="switch"
              onChange={(event) => {
                setCar({ ...car, isConvertible: event.target.checked });
              }}
            />
          </label>

          <label>
            Interior
            <select
              name="interior"
              aria-label="Interior"
              defaultValue=""
              onChange={(event) => {
                setCar({ ...car, interior: parseInt(event.target.value) });
              }}
            >
              <option disabled value="">
                Interior
              </option>
              {interiors.map((interior) => (
                <option key={interior.id} value={interior.id}>
                  {interior.color}
                </option>
              ))}
            </select>
          </label>

          <label>
            Exterior
            <select
              name="exterior"
              aria-label="Exterior"
              defaultValue=""
              onChange={(event) => {
                setCar({ ...car, exterior: parseInt(event.target.value) });
              }}
            >
              <option disabled value="">
                Exterior
              </option>
              {exteriors.map((exterior) => (
                <option key={exterior.id} value={exterior.id}>
                  {exterior.color}
                </option>
              ))}
            </select>
          </label>

          <label>
            Roof
            <select
              name="roof"
              aria-label="Roof"
              defaultValue=""
              onChange={(event) => {
                setCar({ ...car, roof: parseInt(event.target.value) });
              }}
            >
              <option disabled value="">
                Roof
              </option>
              {validRoofs.map((roof) => (
                <option key={roof.id} value={roof.id}>
                  {roof.color}
                </option>
              ))}
            </select>
          </label>

          <label>
            Wheels
            <select
              name="wheels"
              aria-label="Wheels"
              defaultValue=""
              onChange={(event) => {
                setCar({ ...car, wheels: parseInt(event.target.value) });
              }}
            >
              <option disabled value="">
                Wheels
              </option>
              {wheels.map((wheel) => (
                <option key={wheel.id} value={wheel.id}>
                  {wheel.color}
                </option>
              ))}
            </select>
          </label>

          <h3>Summary</h3>
          <p>Name: {car.name}</p>
          <p>Convertible: {car.isConvertible ? "yes" : "no"}</p>
          <p>
            Interior: {selectedInterior ? selectedInterior.color : "unselected"}
          </p>
          <p>
            Exterior: {selectedExterior ? selectedExterior.color : "unselected"}
          </p>
          <p>Roof: {selectedRoof ? selectedRoof.color : "unselected"}</p>
          <p>Wheels: {selectedWheels ? selectedWheels.color : "unselected"}</p>
          <p>Total price: {car.price}</p>

          {isCarValid && (
            <button type="submit" value="Submit" onClick={submitCar}>
              Submit
            </button>
          )}
        </form>
      </article>
    </div>
  );
};

export default CreateCar;
