// @flow
import Web3 from "web3";

export type State = {
  web3Status: "none" | "loading" | "enabled" | "disabled" | "error",
  web3: null | Web3,
  currentTx: null | string,
  txStatus: null | "pending" | "confirmed" | "error",
  user: null | string,
  networkId: null | 1 | 3
};

const types = {
  SET_WEB3: "SET_WEB3",
  SET_WEB3_STATUS: "SET_WEB3_STATUS",
  SET_TX: "SET_TX",
  SET_AUCTION: "SET_AUCTION",
  SET_USER: "SET_USER",
  SET_NETWORK_ID: "SET_NETWORK_ID"
};

const initialState: State = {
  web3Status: "none",
  web3: null,
  currentTx: null,
  txStatus: null,
  user: null,
  networkId: null
};

const reducer = (
  state: State = initialState,
  action: { type: $Values<typeof types>, payload: Object }
) => {
  switch (action.type) {
    case types.SET_WEB3:
      return {
        ...state,
        web3: action.payload.web3,
        web3Status: action.payload.web3Status
      };
    case types.SET_WEB3_STATUS:
      return {
        ...state,
        web3Status: action.payload.web3Status
      };
    case types.SET_TX:
      return {
        ...state,
        txStatus: action.payload.txStatus,
        currentTx: action.payload.currentTx
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case types.SET_NETWORK_ID:
      return {
        ...state,
        networkId: action.payload.networkId
      };
    default:
      throw new Error(`Unexpected state transition: ${action.type}`);
  }
};

export { initialState, types, reducer };
