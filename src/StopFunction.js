const { ethers } = require("ethers");
const userAppABI = require("./abis/UserApp.json").abi;


async function StopFunction(
  userAppAddress,
  artistAppAddress,
  ozenTokenAddress,
  userAppAbi,
  promoted
) {

    const artistAddress="0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69";
    const ozenAddress="0xab573EC236CAf73d48cCFB00C116943A15be7f35";
    const userAddress = "0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174";

  const PRIVATE_KEY =
    "";

  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/0aWYomtIkhZ7DpFAZtNasdu74nL_ZlMf"
  );
  const signer2 = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Stop Function Called!");



//   const userAppContract = new ethers.Contract(
//     userAppAddress,
//     userAppAbi,
//     signer2
//   );

//   console.log(userAppContract);

// await window.ethereum.request({ method: 'eth_requestAccounts'});
// let provider = new ethers.providers.Web3Provider(window.ethereum);
// let signer2 = provider.getSigner(0);

const userAppContract = new ethers.Contract(userAddress, userAppABI, signer2);

  if (!promoted) {
    const stopPayTx = await userAppContract.deleteFlowToArtist(
        ozenAddress,
        artistAddress
    );
    await stopPayTx.wait();

    console.log(`Stop Pay Data: ${stopPayTx}`);
  } else {
    const stopPromoTx = await userAppContract.deleteFlowFromArtist(
        ozenAddress,
        artistAddress
    );
    await stopPromoTx.wait();

    console.log(`Stop Promo Data:${stopPromoTx}`);
  }
}

exports.StopFunction = StopFunction;
