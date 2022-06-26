const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const UserAppABI =
  require("../artifacts/contracts/UserApp.sol/UserApp.json").abi;
const OzenSuperTokenABI =
  require("../artifacts/contracts/OzenSuperToken.sol/OzenSuperToken.json").abi;

async function main() {
  const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
  const ozenSuperTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
  // const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";

  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const signers = await hre.ethers.getSigners();

  const OzenSuperTokenABI = [
    "function mint(address, uint256, bytes)",
    "function transfer(address, uint256)",
    "function balanceOf(address) view returns(uint256)",
    "function approve(address, uint256) external returns(bool)",
    "function transferFrom(address,address,uint256)",
  ];

  const userAppContract = new ethers.Contract(
    userAppAddress,
    UserAppABI,
    provider
  );

  // const ArtistAppContract = new ethers.Contract(
  //   artistAppAddress,
  //   UserAppABI,
  //   provider
  // );

  const ozenSuperTokenContract = new ethers.Contract(
    ozenSuperTokenAddress,
    OzenSuperTokenABI,
    provider
  );

  const amount = ethers.utils.parseEther("1000000");

  // call money router send lump sum method from signers[0]
  await userAppContract
    .connect(signers[0])
    .sendLumpSumToContract(ozenSuperTokenAddress, amount)
    .then(function (tx) {
      console.log(`
        Successfully sent funds to the UserApp Contract. 
        Tx Hash: ${tx.hash}
    `);
    });

  // await ArtistAppContract.connect(signers[0])
  //   .sendLumpSumToContract(ozenSuperTokenAddress, amount)
  //   .then(function (tx) {
  //     console.log(`
  //     Successfully sent funds to the ArtistApp Contract. 
  //     Tx Hash: ${tx.hash}
  // `);
  //   });

  const userAppBalance = await ozenSuperTokenContract.balanceOf(userAppAddress);
  // const artistAppBalance = await ozenSuperTokenContract.balanceOf(
  //   artistAppAddress
  // );

  console.log(`UserApp Balance: ${userAppBalance}`);
  // console.log(`ArtistApp Balance: ${artistAppBalance}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
