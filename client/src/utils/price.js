import { getExterior, getInterior, getRoof, getWheels } from "./data";

export const calcCarPrice = (car) => {
  let price = 65000;

  if ("interior" in car) {
    price += getInterior(car.interior).price;
  }

  if ("exterior" in car) {
    price += getExterior(car.exterior).price;
  }

  if ("roof" in car) {
    price += getRoof(car.roof).price;
  }

  if ("wheels" in car) {
    price += getWheels(car.wheels).price;
  }

  return price;
};
