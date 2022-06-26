/* 
Faucet: https://hackathon.skale.network/?utm_medium=organicsocial&utm_source=linktree&utm_campaign=skale+faucet
*/

const Filestorage = require('@skalenetwork/filestorage.js');
const fs = require('fs');
const Web3 = require('web3');
// const dotenv = require("dotenv")

// dotenv.config()

// If not using the SDK, replace the endpoint below with your SKALE Chain endpoint
let endpoint = 'https://hackathon0.skalenodes.com:10008'
let filestorage = new Filestorage(endpoint);

// If not using the SDK, replace with the SKALE Chain owner key and address.
let privateKey = '';
let address =  '0x6558e89b3399A2bC82Bfc98b0BcE6E13163243F1';

let directoryPath = './public/media';

// Bytes of filestorage space to allocate to an address
// reservedSpace must be >= sum of uploaded files
// const reservedSpace = 3 * 10 ** 8;

const files = fs.readdirSync(directoryPath);

async function upload() {
    // Owner must reserve space to an address
    // await filestorage.reserveSpace(address, address, reservedSpace, privateKey);
    for(let i = 0; i < files.length; ++i)  {
        let content;
        let contentPath;
        console.log('uploading: ' + directoryPath + '/' + files[i]);
        content = await fs.readFileSync(directoryPath + '/' + files[i]);
        contentPath = await filestorage.uploadFile(address, files[i], content, privateKey);
        console.log('content path: ' + contentPath);
    }

    // for(let i = 0; i < files.length; ++i)  {
    //     await filestorage.deleteFile(address, files[i], privateKey);
    // }
}

upload();