import React from 'react';
import styled from 'styled-components';

import Image from '../shared/Image';
import Loader from './Loader';

const Wrapper = styled.div`
  height: 80px;
  width: 80px;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    img {
      transform: translateY(-10px);
    }
  }
`;

const Cell = ({ item = {}, style = {}, handleAddSticker = null }) => (
  <div style={style}>
    <Wrapper onClick={() => handleAddSticker(item.id, item.title)}>
      <Image
        id={item.id}
        alt={item.title}
        height={52}
        width={52}
        loader={<Loader height={80} width={80} />}
        style={{ transition: 'transform 0.2s linear', willChange: 'transform' }}
      />
    </Wrapper>
  </div>
);

export default Cell;
