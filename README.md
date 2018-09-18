# ethmimo
The JS library for the Mimo protocol. Use it to build third-party apps for Mimo and build Dapps leveraging profiles on ENS.

## Install
```sh
npm install ethmimo web3 ipfs
```

## Quick Start

### How to setup Mimo
```js
const Mimo = require('ethmimo');
const IPFS = require('ipfs');
const Web3 = require('web3');

// set up necessary nodes
const ipfs = new IPFS();
const web3 = new Web3();

// Set up Mimo
const mimo = new Mimo(web3, ipfs);
```

### How to create and save a profile
```js
// Set up a DB for an ENS name
const alice = await mimo.createProfile('alice.mimoapp.eth');

// save the DB address to the blockchain
mimo.saveProfile(alice, web3.eth.accounts[0]);

// You MUST save your profile after creating it
```

### How to open a profile
```js
// Set up a DB for an ENS name
const bob = await mimo.openProfile('bobsburgers.eth');
```

### How to add data to a profile DB
```js
// add data to the DB
// You must include a signature of the data by the owner of the profile
bob.add({bio: 'I <3 ETH!'}, <signature>);

// You DON'T need to save your profile after adding data
```

### How to get a profile DB's logs
```js
// Get all data published to a user's DB
await mimo.getHistory('bobsburgers.eth')
.then(logs => console.log(logs));

// You can also pass a DB object
mimo.getHistory(alice)
.then(logs => console.log(logs));
```

### How to get the current state of a profile
```js
// Get a specific property of a profile
await mimo.getCurrentValue('bobsburgers.eth', 'bio')
.then(res => console.log(res));

// works with DB object
await mimo.getCurrentValue(alice, 'bio')
.then(res => console.log(res));

// Get the current state of a profile
// You can either retrieve any particular properties you want
await mimo.getState('bobsburgers.eth', ['bio'])
.then(state => console.log(state));

// You can also pass a DB object
mimo.getState(alice, ['picture', 'bio'])
.then(state => console.log(state));
```

### Extra utils
```js
// Get the owner of an ENS name
await mimo.owner('gitcoin.eth');
// >> 0xddf369c3bf18b1b12ea295d597b943b955ef4671

// Checks if an ENS name is registered/valid
await mimo.isNameValid('gitcoin.eth');
// >> true

// Check if an unlocked account is the owner of a given ENS name
await mimo.isAccountOwner('gitcoin.eth', web3.eth.accounts[0]);
// >> true/false
```

## Documentation

To learn more about DB specific methods, see the OrbitDB documentation [here](https://github.com/orbitdb/orbit-db).

To learn more about MimoStore and `ethmimo-orbit`, see the documentation [here](https://github.com/ethmimo/mimo-orbit).

## Contributing
Please DM me on [Twitter (@ghiliweld)](https://twitter.com/ghiliweld) if you're interested in helping, my DMs are open!

PRs are open too!

## License

[MIT](LICENSE) © 2018 Ghilia Weldesselasie
