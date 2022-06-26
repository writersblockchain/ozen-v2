const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const UserAppABI =
  require("../artifacts/contracts/UserApp.sol/UserApp.json").abi;

async function main() {
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

  await userAppContract
    .connect(signers[0])
    .createFlowFromArtist(
      ozenSuperTokenAddress,
      "385802469135802",
      artistAppAddress
    )
    .then(function (tx) {
      console.log(`
        Congrats! You just successfully Started a flow that was being sent into the money router contract. 
        Tx Hash: ${tx.hash}
    `);
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
