import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { StateContext } from "../state";
import useActions from "../hooks/useActions";

const Container = styled.div`
  max-width: 768px;
  padding: 20px;
  margin-right: auto;
  margin-left: auto;
`;

export default props => {
  const { state, dispatch } = useContext(StateContext);
  const { initializeWeb3 } = useActions(state, dispatch);
  useEffect(() => {
    initializeWeb3();
  }, []);

  return <Container>{props.children}</Container>;
};
