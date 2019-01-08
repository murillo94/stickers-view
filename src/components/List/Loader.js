import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 8px;
  cursor: default;
  animation: color 1.5s ease-in infinite;

  @keyframes color {
    100%,
    0% {
      background-color: #fff;
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
  }
`;

const Loader = () => <Loading />;

export default Loader;
