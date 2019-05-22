import { types } from "./reducer";

export const refreshOnTerminalTransactions = (state, dispatch, action) => {
  if (action.type !== types.SET_TX || action.payload.txStatus === null) {
    return;
  }

  if (action.payload.txStatus === "confirmed") {
    dispatch({
      type: types.SET_TX,
      payload: { currentTx: null, txStatus: null }
    });
  }
};
