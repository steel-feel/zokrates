//Important: Make sure verifier has been generated 
const hre = require("hardhat");

async function main() {

  const Verifier_factory = await hre.ethers.getContractFactory("Verifier");
  const verifier = await Verifier_factory.deploy();
  await verifier.deployed();

  console.log("Verifier deployed to:", verifier.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
