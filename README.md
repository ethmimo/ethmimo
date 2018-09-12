# ethmimo
The JS library for the Mimo protocol. Use it to build third-party apps for Mimo and build Dapps leveraging profiles on ENS.

## Install
```sh
npm ethmimo
```

## Quick Start

```js
const Mimo = require('ethmimo');
const IPFS = require('ipfs');
const Web3 = require('web3');

// set up necessary nodes
const ipfs = new IPFS();
const web3 = new Web3();

// Set up Mimo
const mimo = new Mimo(web3, ipfs);

// Set up a DB for an ENS name
const alice = await mimo.createProfile('alice.mimoapp.eth');

// add data to the DB
// see ethmimo-orbit for more info on DB methods
alice.add({bio: 'I <3 ETH!'}, 'signature');

// save changes made to a DB to the blockchain
mimo.saveProfile(alice, web3.eth.accounts[0]);

// If a DB already exists for a profile, you can simply open it
const bob = await mimo.openProfile('bobsburgers.eth');

// Get all data published to a user's DB
mimo.getHistory('bobsburgers.eth')
.then(logs => console.log(logs));

// You can also pass a DB object
mimo.getHistory(alice)
.then(logs => console.log(logs));
```

## Documentation

To learn more about DB specific methods, see the OrbitDB documentation [here](https://github.com/orbitdb/orbit-db).

To learn more about MimoStore and `ethmimo-orbit`, see the documentation [here](https://github.com/ethmimo/mimo-orbit).

## Contributing
Please take a look at our [contributing](CONTRIBUTING.md) guidelines if you're interested in helping!


## License

[MIT](LICENSE) © 2018 Ghilia Weldesselasie
