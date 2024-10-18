import React from "react";
import interiorsData from "../data/interiors.js";
import exteriorsData from "../data/exteriors.js";
import roofsData from "../data/roofs.js";
import wheelsData from "../data/wheels.js";
import { getRoof } from "../utils/data.js";

const CarEditor = ({
  updateCar,
  submitCar,
  name,
  isConvertible,
  interior,
  exterior,
  roof,
  wheels,
}) => {
  const validRoofs = roofsData.filter((roof) => {
    if (isConvertible) {
      return roof.isConvertible;
    }

    return true;
  });

  const isCarValid =
    name &&
    name !== "" &&
    isConvertible !== undefined &&
    interior &&
    exterior &&
    roof &&
    wheels;

  console.log(isCarValid);

  return (
    <form>
      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
          value={name}
          onChange={(event) => {
            updateCar({ name: event.target.value });
          }}
        />
      </label>

      <label>
        Covertible
        <span className="spacer"></span>
        {!roof || getRoof(roof).isConvertible ? (
          <input
            type="checkbox"
            name="convertible"
            role="switch"
            value={isConvertible}
            onChange={(event) => {
              updateCar({ isConvertible: event.target.checked });
            }}
          />
        ) : (
          <span>Incompatible with roof</span>
        )}
      </label>

      <label>
        Interior
        <select
          name="interior"
          aria-label="Interior"
          defaultValue=""
          value={interior}
          onChange={(event) => {
            updateCar({ interior: parseInt(event.target.value) });
          }}
        >
          <option disabled value="">
            Interior
          </option>
          {interiorsData.map((interior) => (
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
          value={exterior}
          onChange={(event) => {
            updateCar({ exterior: parseInt(event.target.value) });
          }}
        >
          <option disabled value="">
            Exterior
          </option>
          {exteriorsData.map((exterior) => (
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
          value={roof}
          onChange={(event) => {
            updateCar({ roof: parseInt(event.target.value) });
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
          value={wheels}
          onChange={(event) => {
            updateCar({ wheels: parseInt(event.target.value) });
          }}
        >
          <option disabled value="">
            Wheels
          </option>
          {wheelsData.map((wheel) => (
            <option key={wheel.id} value={wheel.id}>
              {wheel.color}
            </option>
          ))}
        </select>
      </label>

      {isCarValid && (
        <button type="submit" value="Submit" onClick={submitCar}>
          Submit
        </button>
      )}
    </form>
  );
};

export default CarEditor;
