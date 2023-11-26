const Moralis = require("moralis").default;
const Chains = require("@moralisweb3/common-evm-utils");
const EvmChain = Chains.EvmChain;
const ABI = require("./abi.json");
require("dotenv").config();

const filterString = '{"gt":["value","100000000000"]}';
const filterObject = JSON.parse(filterString);

const options = {
  chains: [EvmChain.ETHEREUM],
  description: "USDC Transfers 100k",
  tag: "usdcTransfers100k",
  includeContractLogs: true,
  abi: ABI,
  topic0: ["Transfer(address,address,uint256)"],
  webhookUrl: "https://fd7b-14-139-196-203.ngrok.io/webhook",
  advancedOptions: [
    {
      topic0: "Transfer(address,address,uint256)",
      filter: filterObject
    }
]

};

Moralis.start({
  apiKey: process.env.MORALIS_KEY ,
}).then(async () => {
  const stream = await Moralis.Streams.add(options);
  const { id } = stream.toJSON();

  await Moralis.Streams.addAddress({
      id: id,
      address: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
  })
});