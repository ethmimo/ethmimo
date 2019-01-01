const OrbitDB = require('orbit-db');
const MimoStore = require('mimostore');

const loadDB = async (ipfs) => {

  let orbitdb;
  let db;

  // add the MimoStore type to OrbitDB
  OrbitDB.addDatabaseType(MimoStore.type, MimoStore);

  // create an OrbitDB instance
  orbitdb = new OrbitDB(ipfs, './orbit/mimo');

  // create a MimoStore instance
  db = await orbitdb.create('mimo', MimoStore.type, { write: ['*'] });

  // load the db
  await db.load();

  return db;

};

module.exports = loadDB;
