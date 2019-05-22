// @flow

import { types } from "../reducer";
import type { State } from "../reducer";
import Web3 from "web3";
import { getAccount } from "../lib/web3Helpers";

const useActions = (state: State, dispatch: Function) => {
  async function initializeWeb3() {
    dispatch({
      type: types.SET_WEB3_STATUS,
      payload: { web3Status: "loading" }
    });

    // Try to get and enable a web3 provider. If window.ethereum is available, try to enable it and set the user.
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        dispatch({
          type: types.SET_NETWORK_ID,
          payload: { networkId }
        });

        // If there are accounts, we're already enabled
        const accounts = await web3.eth.getAccounts();
        if (accounts.length) {
          const user = accounts[0];
          dispatch({
            type: types.SET_USER,
            payload: { user }
          });
          dispatch({
            type: types.SET_WEB3,
            payload: { web3Status: "enabled", web3 }
          });
        } else {
          dispatch({
            type: types.SET_WEB3,
            payload: { web3Status: "disabled", web3 }
          });
        }
      } catch (e) {
        // If we can't enable, set web3status as disabled.
        dispatch({
          type: types.SET_WEB3,
          payload: { web3Status: "error", web3: null }
        });
      }
    } else {
      // If web3 is not available, use Infura
      try {
        dispatch({
          type: types.SET_WEB3,
          payload: {
            web3Status: "disabled",
            web3: new Web3(
              new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_URL)
            )
          }
        });
      } catch (e) {
        dispatch({
          type: types.SET_WEB3,
          payload: {
            web3Status: "error",
            web3: null
          }
        });
      }
    }
  }

  async function signIn(
    onComplete: Function,
    onError: (Error | string) => void
  ) {
    const { web3Status } = state;

    if (web3Status === "enabled" || web3Status === "error") {
      return;
    }

    // if injected, try to enable
    if (!!window.ethereum) {
      try {
        await window.ethereum.enable();
      } catch (e) {
        console.error(e);
        onError(e.message);
      }
      const web3 = new Web3(window.ethereum);
      dispatch({
        type: types.SET_WEB3,
        payload: {
          web3,
          web3Status: "enabled"
        }
      });
      const user = getAccount(web3);
      dispatch({
        type: types.SET_USER,
        payload: {
          user
        }
      });
      onComplete();
    }
  }

  return {
    initializeWeb3,
    signIn
  };
};

export default useActions;
