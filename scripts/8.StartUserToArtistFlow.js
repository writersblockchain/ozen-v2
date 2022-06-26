const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const UserSuperAppABI =
  require("../artifacts/contracts/UserApp.sol/UserApp.json").abi;

// to run this script:
// 1) Make sure you've created your own .env file
// 2) Make sure that you have your network and accounts specified in hardhat.config.js
// 3) Make sure that you add the address of your own money router contract
// 4) Make sure that you change the params in the createFlowFromContract function to reflect the proper values
// 3) run: npx hardhat run scripts/createFlowFromContract.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signers = await hre.ethers.getSigners();

  const ozenSuperTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
  // NOTE - make sure you add the address of the previously deployed money router contract on your network
  const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
  // add the address of your intended receiver
  const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";

  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const userAppContract = new ethers.Contract(
    userAppAddress,
    UserSuperAppABI,
    provider
  );

  // call money router create flow into contract method from signers[0]
  // this flow rate is ~1000 tokens/month
  await userAppContract
    .connect(signers[0])
    .createFlowToArtist(
      ozenSuperTokenAddress,
      artistAppAddress,
      "385802469135802"
    )
    .then(function (tx) {
      console.log(`
        Congrats! You just successfully created a flow from UserApp to ArtistApp. 
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
