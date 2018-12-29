const emojihash = require('web3-emojihash');
const loadDB = require('./db.js');

class Mimo {

  // TODO: async constructor???
  constructor(ipfs) {
    this.db = this.initDB(ipfs);
  }

  static address(db) {
    return this.db.address.toString();
  }

  static async getAllProfiles(db) {
    return this.db.all();
  }

  static async getProfile(db, id) {
    return this.db.get(id);
  }

  static async getProfiles(db, ids) {
    const profiles = ids.map(async id => await this.getProfile(db, id));
    return profiles;
  }

  static async getProfilesByName(db, name) {
    return this.getAllProfiles(db).filter(profile => profile.name = name);
  }

  static async getProfileByEmoji(db, emojis) {
    return this.getAllProfiles(db).find(profile => emojihash(profile.id) = emojis);
  }

  static async isNameRegistered(db, name) {
    return this.getProfilesByName(db, name).length > 0;
  }

  static async resolveENSName(db, web3, ensname) {
    const owner = web3.eth.ens.registry.owner(ensname);
    return await getProfile(db, owner);
  }

  // static async getMutualFollows(db, id1, id2) {
  //   const first = await getProfile(db, id1);
  //   const second = await getProfile(db, id2);
  //   const mutuals = first.following.filter(f => second.following.includes(f));
  //   return await getProfiles(db, mutuals);
  // }

  static async updateProfile(db, signature, data) {
    try {
      const { id } = await this.db.put(signature, data);
      return await this.db.get(id);
    }
    catch(e) {
      throw new Error(e);
    }
  }

  static async initDB(ipfs) {
    try {
      return await loadDB(ipfs);
    }
    catch(e) {
      throw new Error(e);
    }
  }

}

module.exports = Mimo;
