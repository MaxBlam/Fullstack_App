const db = require('../db');

async function dbGetRides() {
  const { rows } = await db.query(
    'SELECT id,abfahrt_zeit,b.name,b.standort,ankunft_zeit,b2.name,b2.standort FROM fahrt JOIN bahnhof b on b.kuerzel = fahrt.fk_bahnhofab JOIN bahnhof b2 on b2.kuerzel = fahrt.fk_bahnhofzu ORDER BY abfahrt_zeit',
  );
  return {
    code: 200,
    data: rows,
  };
}
async function dbGetRide(id) {
  const { rows } = await db.query('SELECT * FROM fahrt WHERE id=', [id]);
  return {
    code: 200,
    data: rows,
  };
}
async function dbGetTrain(name) {
  const { rows } = await db.query('SELECT * FROM zug WHERE name=', [name]);
  return {
    code: 200,
    data: rows,
  };
}
async function dbGetStation(abbr) {
  const { rows } = await db.query('SELECT * FROM bahnhof WHERE kuerzel=', [
    abbr,
  ]);
  return {
    code: 200,
    data: rows,
  };
}

async function dbChangeTrain(name, newObject) {
  let upd = [];
  for (key in newObject) upd.push(`${key} = '${newObject[key]}'`);
  const cmd = 'UPDATE zug SET ' + upd.join(', ') + ' WHERE name = $1';
  await db.query(cmd, [name]);
  return {
    code: 200,
    data: 'Train was updated',
  };
}
async function dbChangeStation(abbr, newObject) {
  let upd = [];
  for (key in newObject) upd.push(`${key} = '${newObject[key]}'`);
  const cmd = 'UPDATE bahnhof SET ' + upd.join(', ') + ' WHERE kuerzel = $1';
  await db.query(cmd, [abbr]);
  return {
    code: 200,
    data: 'Station was updated',
  };
}

async function dbDeleteRide(id) {
  await db.query('DELETE FROM fahrt WHERE id = $1', [id]);
  return {
    code: 200,
    data: 'Deleted',
  };
}
async function dbDeleteTrain(name) {
  await db.query('DELETE FROM zug WHERE name = $1', [name]);
  return {
    code: 200,
    data: 'Deleted',
  };
}
async function dbDeleteStation(abbr) {
  await db.query('DELETE FROM bahnhof WHERE kuerzel = $1', [abbr]);
  return {
    code: 200,
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
    code: 200,
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
    code: 200,
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
    code: 200,
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
