import React from 'react';
import styled, { keyframes } from 'styled-components';

const Color = keyframes`
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
`;

const Loading = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border-radius: 8px;
  cursor: default;
  animation: ${Color} 1.5s ease-in infinite;
`;

const Loader = ({ height, width }) => <Loading height={height} width={width} />;

export default Loader;
