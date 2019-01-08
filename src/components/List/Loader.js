import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 8px;
  cursor: default;
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

const Loader = () => <Loading />;

export default Loader;
