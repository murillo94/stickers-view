import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  animation: color 1.5s infinite;

  @keyframes color {
    0% {
      background: #ff7f7f;
    }
    20% {
      background: #ff7f7f;
    }
    40% {
      background: #fcff8c;
    }
    60% {
      background: #76f6bf;
    }
    80% {
      background: #6fd5ee;
    }
    100% {
      background: #c59be2;
    }
  }
`;

const Loader = () => (
  <Wrapper>
    <Loading />
  </Wrapper>
);

export default Loader;
