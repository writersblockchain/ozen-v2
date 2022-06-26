const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { factory } = require("./utils/constants");
const OzenSuperTokenArtifact = require("../artifacts/contracts/OzenSuperToken.sol/OzenSuperToken.json").abi;

require("dotenv").config();

async function main() {
  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const signers = await hre.ethers.getSigners();

  const OzenSuperTokenABI = [
    "function mint(address, uint256, bytes)",
    "function transfer(address, uint256)",
    "function balanceOf(address) view returns(uint256)",
    "function approve(address, uint256) external returns(bool)",
  ];

  const ozenSuperTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
  const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
  const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";

  const ozenSuperTokenContract = new hre.ethers.Contract(
    ozenSuperTokenAddress,
    OzenSuperTokenABI,
    signers[0]
  );
  const amount = hre.ethers.utils.parseEther("1000000000");
  const approveAmount = hre.ethers.utils.parseEther("10000000000000000000000000");

  const mintTx = await ozenSuperTokenContract.mint(
    signers[0].address,
    amount,
    0x0
  );
  await ozenSuperTokenContract.approve(userAppAddress, approveAmount);
  await ozenSuperTokenContract.approve(artistAppAddress, approveAmount);

  await mintTx.wait();

  const userBalance = await ozenSuperTokenContract.balanceOf(
    signers[0].address
  );

  console.log(`User Balance= ${userBalance}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
