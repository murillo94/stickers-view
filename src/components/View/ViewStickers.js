import React from 'react';
import styled from 'styled-components';

import Sticker from './Sticker';

const macImage = require('../../assets/mac.png');

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const View = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Drag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ViewStickers = ({ data = [] }) => (
  <Wrapper>
    <View>
      <Image src={macImage} />
      <Drag>
        {Object.keys(data).map((id, key) => (
          <Sticker key={key} id={id} urlId={data[id].id} />
        ))}
      </Drag>
    </View>
  </Wrapper>
);

export default ViewStickers;
