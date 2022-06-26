const { ethers } = require("ethers");

async function GetBalance(userAppAddress, artistAppAddress, radioAppAddress, ozenTokenAddress, ozenTokenABI, signer) {

   
    const ozenTokenContract = new ethers.Contract(ozenTokenAddress, ozenTokenABI, signer);

   const userAppBalance = ethers.utils.formatEther(await ozenTokenContract.balanceOf(userAppAddress));
   const artistAppBalance = ethers.utils.formatEther(await ozenTokenContract.balanceOf(artistAppAddress));
   const radioAppBalance = ethers.utils.formatEther(await ozenTokenContract.balanceOf(radioAppAddress));

   return {
    userAppBalance: userAppBalance,
    artistAppBalance: artistAppBalance,
    radioAppBalance: radioAppBalance,
   }


}

exports.GetBalance = GetBalance;
