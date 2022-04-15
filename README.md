# zokrates

Simple project 📘 to demonstrate 👨‍🔬 zokrates, zk-Snark to prove 🧾something without revealing the answer. 

In others words, 
> I know a in f(a, b) = c

## Installation

`npm i`

## Steps

1.Generate proof and verifier contracts for the program in _/zok-src_

`npx hardhat run scripts/generate-proof.js`

2.Deploy contract on chain using deploy.js

`npx hardhat run scripts/deploy.js`

## Test

`npm test`