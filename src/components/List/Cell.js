import React from 'react';
import styled from 'styled-components';
import Img from 'react-image';

import Loader from './Loader';

const Image = styled.div`
  height: 100%;
  width: 100%;
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
    img {
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
        style={{ transition: 'transform 0.2s linear', willChange: 'transform' }}
        loader={<Loader height={80} width={80} />}
        unloader={'Error :('}
        container={img => {
          return <Image>{img}</Image>;
        }}
      />
    </Wrapper>
  </div>
);

export default Cell;
