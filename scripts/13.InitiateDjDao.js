const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const UserAppABI =
  require("../artifacts/contracts/UserApp.sol/UserApp.json").abi;

async function main() {

  const signers = await hre.ethers.getSigners();

  const ozenSuperTokenAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";
  // NOTE - make sure you add the address of the previously deployed money router contract on your network
//   const userAppAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";
  // add the address of your intended receiver
  const artistAppAddress = "0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";
  const radioDaoAddress ="0x46F411c24ffF4338Fb1f09a026Da1a3F3b764Ec5";

  const OzenSuperTokenABI = [
    "function mint(address, uint256, bytes)",
    "function transfer(address, uint256)",
    "function balanceOf(address) view returns(uint256)",
    "function approve(address, uint256) external returns(bool)",
  ];

  const amount = hre.ethers.utils.parseEther("1000000");
//   const approveAmount = hre.ethers.utils.parseEther("10000000000000000000000000");

  const ozenSuperTokenContract = new hre.ethers.Contract(
    ozenSuperTokenAddress,
    OzenSuperTokenABI,
    signers[0]
  );
  

  const mintTx = await ozenSuperTokenContract.mint(
    radioDaoAddress,
    amount,
    0x0
  );


  const provider = new hre.ethers.providers.JsonRpcProvider(
    process.env.MUMBAI_URL
  );

  const radioDaoContract = new ethers.Contract(
    radioDaoAddress,
    UserAppABI,
    provider
  );

  // call money router create flow into contract method from signers[0]
  // this flow rate is ~1000 tokens/month
  await radioDaoContract
    .connect(signers[0])
    .createFlowToArtist(
      ozenSuperTokenAddress,
      artistAppAddress,
      "985802469135802"
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
