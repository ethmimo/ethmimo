# ethmimo
The JS library for the Mimo protocol. Use it to build third-party apps for Mimo.

## Install
```sh
npm install ethmimo
```

## Quick Start

### How to setup Mimo
```js
const initMimo = require('ethmimo');
const IPFS = require('ipfs');

// set up necessary nodes
const ipfs = new IPFS();

// Set up Mimo
const mimo = await initMimo(ipfs);
```

## Documentation

Documentation coming soon :)

## Contributing
Please DM me on [Twitter (@ghiliweld)](https://twitter.com/ghiliweld) if you're interested in helping, my DMs are open!

PRs are open too!

## License

[MIT](LICENSE) © 2018 Ghilia Weldesselasie
