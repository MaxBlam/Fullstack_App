const db = require('../db');

async function dbGetCars() {
  const { rows } = await db.query('SELECT cars.id,title,image,status,price,miles,year_of_make,description,first_name,last_name FROM cars JOIN owner o on cars.owner = o.id');
  return {
    code: 200,
    data: rows,
  };
}

async function dbChangeStatusCar(id, newStatus) {
  const { rows } = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
  if (rows.length > 0) {
    await db.query('UPDATE cars SET status = $1 WHERE id = $2', [
      newStatus,
      id,
    ]);
    return {
      code: 200,
      data: 'Status was updated',
    };
  }
  return {
    code: 400,
    data: `id ${id} was not found in the database`,
  };
}

async function dbDeleteCar(id) {
  const { rows } = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
  if (rows.length > 0) {
    await db.query('DELETE FROM cars WHERE id = $1', [id]);
    return {
      code: 200,
      data: 'Deleted',
    };
  }
  return {
    code: 400,
    data: `id ${id} was not found in the database`,
  };
}

async function dbAddCar(body) {
  const {
    owner,
    title,
    status,
    price,
    image,
    miles,
    yearOfMake,
    description,
  } = body;
  const ownerId = await db.query(
    'SELECT id FROM owner WHERE first_name = $1 AND last_name = $2',
    [owner.firstName, owner.lastName],
  );
  await db.query(
    'INSERT INTO cars (title, status,  price, image, miles, year_of_make, owner, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      title,
      status,
      price,
      image,
      miles,
      yearOfMake,
      ownerId.rows[0].id,
      description,
    ],
  );
  return {
    code: 200,
    data: 'Inserted',
  };
}

module.exports = {
  dbGetCars,
  dbChangeStatusCar,
  dbDeleteCar,
  dbAddCar,
};
