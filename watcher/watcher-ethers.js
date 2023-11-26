const {ethers, WebSocketProvider} = require("ethers");
const ABI = require("./abi.json");
require("dotenv").config();
console.log(process.env.ALCHEMY_KEY)
export default async function getTransfer(){
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; ///USDC Contract
    const provider = new WebSocketProvider('wss://eth-mainnet.g.alchemy.com/v2/nAJ3afH8Pu99Eidsru3HgGEmO_hMh_jU');

    const contract = new ethers.Contract(usdcAddress, ABI, provider);

    contract.on("Transfer", (from, to, value, event)=>{
        console.log('ytgybuhn')
        let transferEvent = {
            "from": from,
            "to": to,
            "value": value,
            // eventData: event,
        }
        console.log('entrd trnsfr', transferEvent)
        console.log("stringified",JSON.stringify(transferEvent))

    })
}

getTransfer()