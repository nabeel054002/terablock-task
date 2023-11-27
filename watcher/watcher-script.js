const {ethers, WebSocketProvider} = require("ethers");
const ABI = require("./abi.json");
// const { updateEntry, testEntry } = require('../my-canister-project/index.ts')
require("dotenv").config();
async function getTransfer(){

    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; ///USDC Contract
    const provider = new WebSocketProvider('wss://eth-mainnet.g.alchemy.com/v2/nAJ3afH8Pu99Eidsru3HgGEmO_hMh_jU');

    const contract = new ethers.Contract(usdcAddress, ABI, provider);

    contract.on("Approval", (from, to, value, event)=>{
        let approvalEvent = {
            "from": from,
            "to": to,
            "value": value,
        }

        // updateEntry used to push the approvalEvent to ICP
        // updateEntry(approvalEvent);
        // testEntry used to test the approvalEvent to ICP
        // testEntry(approvalEvent);
    })
}

getTransfer()