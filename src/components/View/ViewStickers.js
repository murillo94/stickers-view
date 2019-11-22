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

const ViewStickers = ({
  data = [],
  handleSelect = null,
  handleRemove = null
}) => {
  const changeRotate = (id, position, transform) => {
    const rotate = Number(transform.replace(/[^0-9\.?-]+/g, '')) || 0;
    const res = position === 'right' ? rotate + 15 : rotate + -15;

    handleSelect(id, { transform: `rotate(${res}deg)` });
  };

  return (
    <Wrapper>
      <View>
        <Image src={macImage} />
        <Drag>
          {Object.keys(data).map((id, key) => (
            <Sticker
              key={key}
              id={id}
              transform={data[id].transform}
              urlId={data[id].id}
              handleRemove={handleRemove}
              changeRotate={changeRotate}
            />
          ))}
        </Drag>
      </View>
    </Wrapper>
  );
};

export default ViewStickers;
