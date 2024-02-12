import Web3 from "web3";

async function getFastGasFeeMatic() {
  try {
    const currentGasResult = await fetch(
      "https://gasstation-mainnet.matic.network/v2"
    );
    const currentGasResultJson = await currentGasResult.json();
    const res = Web3.utils.toBN(parseInt(currentGasResultJson.fast.maxFee));
    const currentGasInWei = Web3.utils.toWei(res, "gwei");
    return currentGasInWei;
  } catch (err) {
    console.log(err);
  }
}

export default getFastGasFeeMatic;
