const { initialize } = require('zokrates-js/node');
const chalk = require("chalk")
const fs = require("fs"),
   path = require("path"),
   fse = require('fs-extra');

initialize().then(async (zokratesProvider) => {
   let parentFolder = path.dirname(path.basename(__dirname));

   let rawdata = fs.readFileSync(parentFolder + '/zok-src/simple.zok');

   const source = rawdata.toString();

   // compilation
   const artifacts = zokratesProvider.compile(source);

   //  computation
   const { witness, output } = zokratesProvider.computeWitness(artifacts, ["4", "16"]);

   // run setup
   const keypair = zokratesProvider.setup(artifacts.program);

   // generate proof
   console.log(chalk.yellowBright("\nGenerating proofs....."));
   const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
   fse.outputFile(parentFolder + "/proofs/proof.json", JSON.stringify(proof));
   console.log(chalk.green("\nProofs generated successfully"));

   // export solidity verifier
   console.log(chalk.yellowBright("\nGenerating Solidity verifier contract....."));
   const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk, "v1");
   fse.outputFile(parentFolder + "/contracts/verifier.sol", verifier);
   console.log(chalk.green("\nContracts generated successfully"));

});