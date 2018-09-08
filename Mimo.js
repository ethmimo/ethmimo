const MimoStore = require('ethmimo-orbit');
const Web3 = require('web3');
const OrbitDB = require('orbit-db');

class Mimo {

  /**
   * Instantiates Mimo
   *
   * @param     {Web3}      web3          A web3 provider instance
   * @param     {IPFS}      ipfs          An IPFS instance
   * @return    {Mimo}                    self
   */
  constructor(web3, ipfs) {
    OrbitDB.addDatabaseType(MimoStore.type, MimoStore);
    this.orbitdb = new OrbitDB(ipfs);
    this.web3 = web3;
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}    name          An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async createProfile(name) {
    await this.orbitdb.create(name, MimoStore.type, {
      web3: this.web3,
      write: [*]
    });
  }

  /**
   * Open an existing MimoStore
   *
   * @param     {String}    name          An ENS name
   * @return    {MimoStore}               The user instance for the given ENS name
   */
  async openProfile(name) {
    this.web3.eth.ens.getMultihash(name).then(function (hash) {
      await orbitdb.open('/orbitdb/${hash}/${name}')
    });
  }

}

module.exports = Mimo;
