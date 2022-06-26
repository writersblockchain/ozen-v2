const { ethers } = require("ethers");
const userAppABI = require("./abis/UserApp.json").abi;


async function StartFunction(userAppAddress, artistAppAddress, ozenTokenAddress, userAppAbi, flowRate, signer, promoted) {

    await window.ethereum.request({ method: 'eth_requestAccounts'});
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer2 = provider.getSigner(0);
    console.log(`userAppAddress ${userAppAddress}`);
    console.log(`artistAppAddress ${artistAppAddress}`);
    console.log(`ozenTokenAddress ${ozenTokenAddress}`);

    
    const userAppContract = new ethers.Contract(userAppAddress, userAppABI, signer2);



    if(!promoted){

        const startPayTx = await userAppContract.createFlowToArtist(ozenTokenAddress,artistAppAddress,flowRate);
        await startPayTx.wait();

        console.log(`Tx Pay Data: ${startPayTx}`);

    } else {
        const startPromoTx = await userAppContract.createFlowFromArtist(ozenTokenAddress,flowRate,artistAppAddress);
        await startPromoTx.wait();

        console.log(`Tx Promot Data:${startPromoTx}`);
    }

}

exports.StartFunction = StartFunction;
