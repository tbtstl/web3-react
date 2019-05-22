// @flow

import Web3 from "web3";

export async function getAccount(
  web3: Web3,
  accountIndex: ?number = 0
): Promise<string> {
  const accounts = await web3.eth.getAccounts();
  return accounts[accountIndex];
}

export async function getContract(web3: Web3): Object {
  throw new Error("Not Implemented");
}

export async function queryContract(web3: Web3, fieldName: string): any {
  const contract = await getContract(web3);
  return await contract.methods[fieldName]().call();
}

export function isValidNetwork(networkId: null | number) {
  return (
    !networkId || networkId.toString() === process.env.REACT_APP_NETWORK_ID
  );
}

export function ethereumIsInjected() {
  return !!window.ethereum;
}

export function desiredNetworkName() {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case "1":
      return "mainnet";
    case "3":
      return "ropsten";
    default:
      return "localhost";
  }
}
