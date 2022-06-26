const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const UserAppABI =
  require("../artifacts/contracts/UserApp.sol/UserApp.json").abi;

// to run this script:
// 1) Make sure you've created your own .env file
// 2) Make sure that you have your network and accounts specified in hardhat.config.js
// 3) Make sure that you add the address of your own money router contract
// 4) Make sure that you change the params in the createFlowIntoContract function to reflect the proper values
// 3) run: npx hardhat run scripts/createFlowIntoContract.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // NOTE - make sure you add the address of the previously deployed money router contract on your network

  const ozenSuperTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
  const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
  const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";

  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const sf = await Framework.create({
    chainId: (await provider.getNetwork()).chainId,
    provider,
    customSubgraphQueriesEndpoint: "",
    dataMode: "WEB3_ONLY",
  });

  const signers = await hre.ethers.getSigners();

  const userAppContract = new ethers.Contract(
    userAppAddress,
    UserAppABI,
    provider
  );

  // call money router create flow into contract method from signers[0]
  // this flow rate is ~1000 tokens/month
  await userAppContract
    .connect(signers[0])
    .deleteFlowFromArtist(ozenSuperTokenAddress, artistAppAddress)
    .then(function (tx) {
      console.log(`
        Successfully deleted a flow from Artist to User. 
        Tx Hash: ${tx.hash}
    `);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
