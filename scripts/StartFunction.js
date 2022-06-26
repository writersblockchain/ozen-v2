const { ethers } = require("ethers");

async function StartFunction(userAppAddress, artistAppAddress, ozenTokenAddress, userAppAbi, flowRate, signer, promoted) {

    const userAppContract = new ethers.Contract(userAppAddress, userAppAbi, signer);


    if(!promoted){

        const startPayTx = await userAppContract.createFlowToArtist(ozenTokenAddress,artistAppAddress,flowRate);
        await startTx.wait();

        console.log(`Tx Pay Data: ${startTx}`);

        

    } else {
        const startPromoTx = await userAppContract.createFlowFromArtist(ozenTokenAddress,artistAppAddress,flowRate);
        await startPromoTx.wait();

        console.log(`Tx Promot Data:${startPromoTx}`);
    }

}

export default StartFunction;
