const emojihash = require('web3-emojihash');
const loadDB = require('./db.js');

class Mimo {

  constructor(db) {
    this.db = db;
  }

  get address() {
    return this.db.address.toString();
  }

  async getAllProfiles() {
    return this.db.all();
  }

  async getProfile( id) {
    return this.db.get(id);
  }

  async getProfiles(ids) {
    const profiles = ids.map(async id => await this.getProfile(db, id));
    return profiles;
  }

  async getProfilesByName(name) {
    return this.getAllProfiles().filter(profile => profile.name = name);
  }

  async getProfileByEmoji(emojis) {
    return this.getAllProfiles().find(profile => emojihash(profile.id) = emojis);
  }

  static async isNameRegistered(name) {
    return this.getProfilesByName(name).length > 0;
  }

  async resolveENSName(web3, ensname) {
    const owner = web3.eth.ens.registry.owner(ensname);
    return await getProfile(owner);
  }

  async updateProfile(signature, data) {
    try {
      const { id } = await this.db.put(signature, data);
      return await this.db.get(id);
    }
    catch(e) {
      throw new Error(e);
    }
  }

}

const initMimo = async ipfs => {
  const db = await loadDB(ipfs);
  const mimo = new Mimo(db);
  return mimo;
}

module.exports = { Mimo, initMimo };
