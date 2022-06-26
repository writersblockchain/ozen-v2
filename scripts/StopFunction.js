const { ethers } = require("ethers");

async function StopFunction(
  userAppAddress,
  artistAppAddress,
  ozenTokenAddress,
  userAppAbi,
  promoted
) {
  const PRIVATE_KEY =
    "e66c96225cd605559b10405b8c3acd03a43df3637f98a1ea60984e42e79dc015";

  const provider = ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/0aWYomtIkhZ7DpFAZtNasdu74nL_ZlMf"
  );
  const signer2 = new ethers.Wallet(PRIVATE_KEY, provider);

  const userAppContract = new ethers.Contract(
    userAppAddress,
    userAppAbi,
    signer2
  );

  if (!promoted) {
    const stopPayTx = await userAppContract.deleteFlowToArtist(
      ozenTokenAddress,
      artistAppAddress
    );
    await stopPayTx.wait();

    console.log(`Stop Pay Data: ${stopPayTx}`);
  } else {
    const stopPromoTx = await userAppContract.deleteFlowFromArtist(
      ozenTokenAddress,
      artistAppAddress
    );
    await stopPromoTx.wait();

    console.log(`Stop Promo Data:${stopPromoTx}`);
  }
}

exports.StopFunction = StopFunction;
