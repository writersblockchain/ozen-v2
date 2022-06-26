const { ethers } = require("ethers");

async function StopFunction(
  userAppAddress,
  artistAppAddress,
  ozenTokenAddress,
  userAppAbi,
  promoted
) {
 

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
