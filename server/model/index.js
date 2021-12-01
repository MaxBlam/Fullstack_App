const db = require('../db');

async function dbGetRides() {
  const { rows } = await db.query(
    'SELECT id,abfahrt_zeit, von.name as von, zu.name as zu, ankunft_zeit FROM fahrt JOIN bahnhof von on fahrt.fk_bahnhofab = von.kuerzel join bahnhof zu on zu.kuerzel = fahrt.fk_bahnhofzu ORDER BY abfahrt_zeit',
  );
  return {
    data: rows,
  };
}
async function dbGetRide(id) {
  const { rows } = await db.query('SELECT * FROM fahrt WHERE id=$1', [id]);
  return {
    data: rows,
  };
}
async function dbGetTrain(name) {
  const { rows } = await db.query('SELECT * FROM zug WHERE name=$1', [name]);
  return {
    data: rows,
  };
}
async function dbGetStation(abbr) {
  const { rows } = await db.query('SELECT * FROM bahnhof WHERE kuerzel=$1', [
    abbr,
  ]);
  return {
    data: rows,
  };
}

async function dbChangeTrain(name, newObject) {
  const upd = [];
  for (key in newObject) upd.push(`${key} = '${newObject[key]}'`);
  const cmd = `UPDATE zug SET ${upd.join(', ')} WHERE name = $1`;
  await db.query(cmd, [name]);
  return {
    data: 'Train was updated',
  };
}
async function dbChangeStation(abbr, newObject) {
  const upd = [];
  for (key in newObject) upd.push(`${key} = '${newObject[key]}'`);
  const cmd = `UPDATE bahnhof SET ${upd.join(', ')} WHERE kuerzel = $1`;
  await db.query(cmd, [abbr]);
  return {
    data: 'Station was updated',
  };
}

async function dbDeleteRide(id) {
  await db.query('DELETE FROM fahrt WHERE id = $1', [id]);
  return {
    data: 'Deleted',
  };
}
async function dbDeleteTrain(name) {
  await db.query('DELETE FROM zug WHERE name = $1', [name]);
  return {
    data: 'Deleted',
  };
}
async function dbDeleteStation(abbr) {
  await db.query('DELETE FROM bahnhof WHERE kuerzel = $1', [abbr]);
  return {
    data: 'Deleted',
  };
}

async function dbAddRide(body) {
  const { stationFrom, stationTo, departTime, arrivalTime } = body;
  await db.query(
    'INSERT INTO fahrt (id,fk_bahnhofab,fk_bahnhofzu,abfahrt_zeit,ankunft_zeit) VALUES (DEFAULT, $1, $2, $3, $4)',
    [stationFrom, stationTo, departTime, arrivalTime],
  );
  return {
    data: 'Inserted',
  };
}
async function dbAddStation(body) {
  const { abbr, name, location } = body;
  await db.query(
    'INSERT INTO bahnhof (kuerzel,name,standort) VALUES ($1, $2, $3)',
    [abbr, name, location],
  );
  return {
    data: 'Inserted',
  };
}
async function dbAddTrain(body) {
  const { name, accessible, seats, desc } = body;
  await db.query(
    'INSERT INTO zug (name,barrierefrei,plaetze,beschreibung) VALUES ($1, $2, $3,$4)',
    [name, accessible, seats, desc],
  );
  return {
    data: 'Inserted',
  };
}

module.exports = {
  dbGetRides,
  dbGetRide,
  dbGetTrain,
  dbGetStation,
  dbChangeTrain,
  dbChangeStation,
  dbDeleteRide,
  dbDeleteTrain,
  dbDeleteStation,
  dbAddRide,
  dbAddStation,
  dbAddTrain,
};
