const getCars = async () => {
  const res = await fetch("/api/cars");
  return await res.json();
};

const getCar = async (id) => {
  const res = await fetch(`/api/cars/${id}`);
  return await res.json();
};

const createCar = async (car) => {
  const res = await fetch("/api/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  return await res.json();
};

const updateCar = async (car) => {
  const res = await fetch(`/api/cars/${car.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  return await res.json();
};

const deleteCar = async (car) => {
  const res = await fetch(`/api/cars/${car.id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export default {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
