const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { factory } = require("./utils/constants")

require("dotenv").config();

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network specified in hardhat.config.js
//3) run: npx hardhat run scripts/deploy.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);

  const sf = await Framework.create({
    chainId: (await provider.getNetwork()).chainId,
    provider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY"
  });

  const signers = await hre.ethers.getSigners();
  const OzenSuperToken = await hre.ethers.getContractFactory("OzenSuperToken");


  const ozenSuperToken = await OzenSuperToken.deploy();

  await ozenSuperToken.deployed();
  await ozenSuperToken.initialize("OZEN","OZT","0x200657E2f123761662567A1744f9ACAe50dF47E6");

  console.log("ozenSuperToken deployed to:", ozenSuperToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
