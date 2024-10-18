import React, { useState } from "react";
import { getExterior, getInterior, getRoof, getWheels } from "../utils/data";

const CarSummary = ({
  name,
  isConvertible,
  interior,
  exterior,
  roof,
  wheels,
  price,
}) => {
  return (
    <div>
      <h3>Summary</h3>
      <p>Name: {name}</p>
      <p>Convertible: {isConvertible ? "yes" : "no"}</p>
      <p>Interior: {interior ? getInterior(interior).color : "unselected"}</p>
      <p>Exterior: {exterior ? getExterior(exterior).color : "unselected"}</p>
      <p>Roof: {roof ? getRoof(roof).color : "unselected"}</p>
      <p>Wheels: {wheels ? getWheels(wheels).color : "unselected"}</p>
      <p>Total price: {price}</p>
    </div>
  );
};

export default CarSummary;
