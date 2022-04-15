const { expect } = require("chai");
const path = require("path"),
    fs = require("fs")

describe("ZK-Snarks Zokrates" ,async () => {

    let verifier, proof, input;

    before(async ()=> {
        //Deploy library
        // const Library_factory = await hre.ethers.getContractFactory("Pairing");
        // const library = await Library_factory.deploy();
        // await library.deployed();
       
        const Verifier_factory = await ethers.getContractFactory("Verifier")
        verifier = await Verifier_factory.deploy()
        await verifier.deployed()
       
        let parentFolder = path.dirname(path.basename(__dirname));
        let rawdata = await fs.readFileSync(parentFolder + '/proofs/proof.json');
        let data = JSON.parse(rawdata);

        proof = data.proof;
        input = data.inputs;
  

    })

    it("Should verify transaction", async ()=> {
        expect(await verifier.verifyTx(proof, input )).to.be.true;
    })

});