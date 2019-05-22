import React, { createContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";
import useActions from "./hooks/useActions";
import { refreshOnTerminalTransactions } from "./middleware";

export const StateContext = createContext();

const augmentDispatch = (state, dispatch) => input =>
  input instanceof Function ? input(state, dispatch) : dispatch(input);

const middlewarePipe = (action, state, dispatch) => {
  const middleware = [refreshOnTerminalTransactions];

  middleware.forEach(fn => {
    fn(state, dispatch, action);
  });
};


export const StateProvider = ({ children }) => {
  // Get state and dispatch from useReducer
  let [state, dispatch] = useReducer(reducer, initialState);

  // Patch dispatch method so we can add some middleware, and basic thunking
  let oldDispatch = dispatch;
  dispatch = action => {
    middlewarePipe(action, state, dispatch);
    oldDispatch(action);
  };


  // Get action from useActions and pass it to Context
  const actions = useActions(state, dispatch);

  // Log new state in dev
  if (process.env.NODE_ENV === "development") {
    /* eslint-disable-next-line */
    useEffect(() => console.log({ newState: state }), [state]);
  }

  // render state, dispatch, and special case actions
  return (
    <StateContext.Provider
      value={{ state, dispatch: augmentDispatch(state, dispatch), actions }}
    >
      {children}
    </StateContext.Provider>
  );
};
