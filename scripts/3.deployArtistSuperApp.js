const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
require("dotenv").config();

// to run this script:
// 1) Make sure you've created your own .env file
// 2) Make sure that you have your network specified in hardhat.config.js
// 3) run: npx hardhat run scripts/deploy.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  // const sf = await Framework.create({
  //   chainId: (await provider.getNetwork()).chainId,
  //   provider,
  //   customSubgraphQueriesEndpoint: "",
  //   dataMode: "WEB3_ONLY"
  // });

  const hostAddress = "0xEB796bdb90fFA0f28255275e16936D25d3418603";

  const signers = await hre.ethers.getSigners();
  // We get the contract to deploy
  const ArtistApp = await hre.ethers.getContractFactory("ArtistApp");
  // deploy the money router account using the proper host address and the address of the first signer
  const artistApp = await ArtistApp.deploy(
    hostAddress,
    signers[0].address
  );

  await artistApp.deployed();

  console.log("ArtistApp deployed to:", artistApp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
