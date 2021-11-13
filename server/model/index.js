const db = require('../db');

async function dbGetRides() {
  const { rows } = await db.query(
    'SELECT id,abfahrt_zeit,b.name,b.standort,ankunft_zeit,b2.name,b2.standort FROM fahrt JOIN bahnhof b on b.kuerzel = fahrt.fk_bahnhofab JOIN bahnhof b2 on b2.kuerzel = fahrt.fk_bahnhofzu ORDER BY abfahrt_zeit'
  );
  return {
    code: 200,
    data: rows,
  };
}

async function dbChangeTrain(name, newDesc) {
  const { rows } = await db.query('SELECT * FROM zug WHERE name = $1', [name]);
  if (rows.length > 0) {
    await db.query('UPDATE zug SET beschreibung=$1 WHERE name=$2', [
      newDesc,
      name,
    ]);
    return {
      code: 200,
      data: 'Status was updated',
    };
  }
  return {
    code: 400,
    data: `name ${name} was not found in the database`,
  };
}

async function dbChangeStation(kuerzel, newObject) {
  const { rows } = await db.query('SELECT * FROM bahnhof WHERE kuerzel = $1', [
    kuerzel,
  ]);
  let upd = [];
  for (key in newObject) upd.push(`${key} = '${newObject[key]}'`);
  const cmd = 'UPDATE bahnhof SET ' + upd.join(', ') + ' WHERE kuerzel = $1';
  if (rows.length > 0) {
    await db.query(cmd, [kuerzel]);
    return {
      code: 200,
      data: 'Status was updated',
    };
  }
  return {
    code: 400,
    data: `kuerzel ${kuerzel} was not found in the database`,
  };
}

async function dbDeleteRide(id) {
  const { rows } = await db.query('SELECT * FROM fahrt WHERE id = $1', [id]);
  if (rows.length > 0) {
    await db.query('DELETE FROM fahrt WHERE id = $1', [id]);
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
async function dbDeleteTrain(name) {
  const { rows } = await db.query('SELECT * FROM fahrt WHERE name = $1', [
    name,
  ]);
  if (rows.length > 0) {
    await db.query('DELETE FROM zug WHERE name = $1', [name]);
    return {
      code: 200,
      data: 'Deleted',
    };
  }
  return {
    code: 400,
    data: `name ${name} was not found in the database`,
  };
}
async function dbDeleteStation(kuerzel) {
  const { rows } = await db.query('SELECT * FROM bahnhof WHERE kuerzel = $1', [
    kuerzel,
  ]);
  if (rows.length > 0) {
    await db.query('DELETE FROM bahnhof WHERE kuerzel = $1', [kuerzel]);
    return {
      code: 200,
      data: 'Deleted',
    };
  }
  return {
    code: 400,
    data: `kuerzel ${kuerzel} was not found in the database`,
  };
}

async function dbAddRide(body) {
  const { fk_bahnhofab, fk_bahnhofzu, abfahrt_zeit, ankunft_zeit } = body;
  await db.query(
    'INSERT INTO fahrt (id,fk_bahnhofab,fk_bahnhofzu,abfahrt_zeit,ankunft_zeit) VALUES (DEFAULT, $1, $2, $3, $4)',
    [fk_bahnhofab, fk_bahnhofzu, abfahrt_zeit, ankunft_zeit]
  );
  return {
    code: 200,
    data: 'Inserted',
  };
}
async function dbAddStation(body) {
  const { kuerzel, name, standort } = body;
  await db.query(
    'INSERT INTO bahnhof (kuerzel,name,standort) VALUES ($1, $2, $3)',
    [kuerzel, name, standort]
  );
  return {
    code: 200,
    data: 'Inserted',
  };
}
async function dbAddTrain(body) {
  const { name, barrierefrei, plaetze, beschreibung } = body;
  await db.query(
    'INSERT INTO zug (name,barrierefrei,plaetze,beschreibung) VALUES ($1, $2, $3,$4)',
    [name, barrierefrei, plaetze, beschreibung]
  );
  return {
    code: 200,
    data: 'Inserted',
  };
}

module.exports = {
  dbGetRides,
  dbChangeTrain,
  dbChangeStation,
  dbDeleteRide,
  dbDeleteTrain,
  dbDeleteStation,
  dbAddRide,
  dbAddStation,
  dbAddTrain,
};
