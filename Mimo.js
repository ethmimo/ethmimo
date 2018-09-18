const MimoStore = require('ethmimo-orbit');
const Web3 = require('web3');
const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');

class Mimo {
  // TODO: remove overloading functions

  /**
   * Instantiates Mimo
   *
   * @param     {Web3}      web3          A web3 provider instance
   * @return    {Mimo}                    self
   */
  constructor(web3, ipfs) {
    if(!web3 instanceof Web3)) throw new Error('Web3 provider not provided');
    if(!(ipfs instanceof IPFS)) throw new Error('IPFS provider not provided');
    OrbitDB.addDatabaseType(MimoStore.type, MimoStore);
    this.orbitdb = new OrbitDB(ipfs);
    this.web3 = web3;
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}      name         An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async createProfile(name) {
    if (!(name instanceof String)) throw new Error('name must be a string');
    await this.orbitdb.create(name, MimoStore.type, {
      web3: this.web3,
      write: [*]
    });
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}      name        An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async openProfile(name) {
    if (!(name instanceof String)) throw new Error('name must be a string');
    this.web3.eth.ens.getMultihash(name).then(function (hash) {
      await orbitdb.open('/orbitdb/${hash}/${name}'); // TODO: Is .open() all that's needed
    });
  }

  /**
   * Save an existing MimoStore to the ENS resolver
   *
   * @param     {OrbitDB}     db           An OrbitDB instance
   * @param     {Web3Account} account      An Ethereum account
   */
  saveProfile(db, account) {
    if (!(db instanceof OrbitDB)) throw new Error('db must be an OrbitDB instance');
    let name = db.address.toString().substring(56);
    let hash = db.address.toString().substring(9, 55);
    this.web3.eth.ens.setMultihash(name, hash, { from: account });
  }

  /**
   * Get all logs in a MimoStore
   *
   * @param     {String/OrbitDB}           profile        An ENS name or OrbitDB instance
   * @return    {Array}                                   An array of JSON data
   */
  async getHistory(profile) {
    if (!(profile instanceof String) || !(profile instanceof OrbitDB)) throw new Error('profile must be a string or OrbitDB instance');

    if (profile instanceof String) {
      await openProfile(name).then(db =>
        db.iterator()
        .collect()
        .map((e) => e.payload.value));
    }

    if (profile instanceof OrbitDB) {
      db.iterator()
        .collect()
        .map((e) => e.payload.value));
    }
  }

  /**
   * Gets the current state of a profile
   *
   * @param     {String/OrbitDB}           profile        An ENS name or OrbitDB instance
   * @param     {StringArray}              filter         An array of values we are filtering for
   * @return    {Object}                                  The current state of a profile
   */
  async getState(profile, filters = []) {
    if (!(profile instanceof String) || !(profile instanceof OrbitDB)) throw new Error('profile must be a string or OrbitDB instance');
    if (filters.find(filter => !(filter instanceof String)) == undefined) throw new Error('all filters must be strings');
    const state = {};
    filters.forEach(filter => await getCurrentValue(profile, filter).then(value => state[filter] = value));
    return state;
  }

  /**
   * Gets the current state of a profile
   *
   * @param     {String/OrbitDB}      profile        An ENS name or OrbitDB instance
   * @param     {String}              filter         The property we are filtering for
   * @return    {Object}                             The current state of a profile
   */
  async getCurrentValue(profile, filter) {
    if (!(profile instanceof String) || !(profile instanceof OrbitDB)) throw new Error('profile must be a string or OrbitDB instance');
    if (!(filter instanceof String)) throw new Error('filter must be a string');

    if (profile instanceof String) {
      const db = await openProfile(profile);
      const claims = db.iterator({ reverse: true }).collect();
      claims.find(claim => claim.hasOwnProperty(filter));
    }

    if (profile instanceof OrbitDB) {
      const claims = profile.iterator({ reverse: true }).collect();
      claims.find(claim => claim.hasOwnProperty(filter));
    }
  }

  /**
   * Get the owner of an ENS name
   *
   * @param     {String}      name           An ENS name
   * @return    {String}                     An Ethereum address
   */
  async getOwner(name) {
    this.web3.eth.ens.registry.owner(name)
  }

  /**
   * Checks if an ENS name is registered/valid
   *
   * @param     {String}      name           An ENS name
   * @return    {Boolean}
   */
  async isNameValid(name) {
    owner(name)
    .then(owner => this.web3.utils.isAddress(owner));
  }

  /**
   * Checks if an account owns the given ENS name
   *
   * @param     {String}           name           An ENS name
   * @param     {Web3Account}      account        An Ethereum account
   * @return    {Boolean}
   */
  async isAccountOwner(name, account) {
    owner(name)
    .then(owner => owner == account);
  }


}

module.exports = Mimo;
