
# Setup 

Initialise a .env file from example and set relevant variables

```
cp .env.example .env
```

# Installation

Install packages and dependencies 

``` 
npm install 
```

Compile contracts 

```
npm run compile
```

Run tests 

```
npm run test
```

Deploy contracts 
*Replace Etheruem with Network Name*
```
npm run deploy-ethereum
```

Verify contracts on Blockscan explorers

```
npx hardhat verify --network <NETWORK NAME> <CONTRACT ADDRESS>
```

# Note

- Once contracts have been deployed, their addresses can be found in /addresses directory