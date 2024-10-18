import interiors from "../data/interiors.js";
import exteriors from "../data/exteriors.js";
import roofs from "../data/roofs.js";
import wheels from "../data/wheels.js";

const getData = (id, data) => {
  return data.find((d) => id === d.id);
};

export const getInterior = (id) => {
  return getData(id, interiors);
};

export const getExterior = (id) => {
  return getData(id, exteriors);
};

export const getWheels = (id) => {
  return getData(id, wheels);
};

export const getRoof = (id) => {
  return getData(id, roofs);
};
