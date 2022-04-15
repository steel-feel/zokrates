const { initialize } = require('zokrates-js/node');
const chalk = require("chalk")
const fs = require("fs"),
   path = require("path");


initialize().then(async (zokratesProvider) => {
   let parentFolder = path.dirname(path.basename(__dirname));

   let rawdata = fs.readFileSync(parentFolder + '/zok-src/simple.zok');

   const source = rawdata.toString();

   // compilation
   const artifacts = zokratesProvider.compile(source);

   //  computation
   const { witness, output } = zokratesProvider.computeWitness(artifacts, ["4", "16"]);

   // // run setup
   const keypair = zokratesProvider.setup(artifacts.program);

   // // generate proof
   console.log(chalk.yellowBright("Generating proofs....."));
   const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
   fs.writeFileSync(parentFolder + "/proofs/proof.json", JSON.stringify(proof));
   console.log(chalk.green("Proofs generated successfully"));

   // export solidity verifier
   console.log(chalk.yellowBright("Generating Solidity verifier contract....."));
   const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk, "v1");
   fs.writeFileSync(parentFolder + "/contracts/verifier.sol", verifier);
   console.log(chalk.green("Contracts generated successfully"));

});