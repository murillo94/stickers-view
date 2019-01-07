import React from 'react';
import styled from 'styled-components';
import Img from 'react-image';

import Loader from './Loader';

const Image = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s linear;
  will-change: transform;
`;

const Wrapper = styled.div`
  height: 80px;
  width: 80px;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px;
  cursor: pointer;
  &:hover {
    ${Image} {
      transform: translateY(-10px);
    }
  }
`;

const Cell = ({
  item = {},
  style = {},
  source = '',
  dimensions = '',
  handleSelect = null
}) => (
  <div style={style}>
    <Wrapper onClick={() => handleSelect(item.id)}>
      <Img
        src={source + item.id + dimensions}
        alt={item.title}
        height={52}
        width={52}
        loader={<Loader />}
        container={img => {
          return <Image>{img}</Image>;
        }}
      />
    </Wrapper>
  </div>
);

export default Cell;
