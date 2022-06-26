const { ethers } = require("ethers");

async function StartFunction(userAppAddress, artistAppAddress, ozenTokenAddress, ozenTokenABI, signer) {

   
    const ozenTokenContract = new ethers.Contract(ozenTokenAddress, ozenTokenABI, signer);

   const userAppBalance = await ozenTokenContract.balanceOf(userAppAddress);
   const artistAppBalance = await ozenTokenContract.balanceOf(artistAppAddress);
   const radioAppBalance = await ozenTokenContract.balanceOf(radioAppAddress);


}

export default StartFunction;
