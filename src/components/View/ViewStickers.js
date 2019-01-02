import React from 'react';
import styled from 'styled-components';

import Sticker from './Sticker';

const macImage = require('../../assets/mac.png');

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
`;

const Image = styled.img`
  width: 100%;
  pointer-events: none;
  user-select: none;
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
  source = '',
  dimensions = '',
  handleSelect = null,
  handleRemove = null
}) => {
  const changePosition = (id, posX, posY) => {
    handleSelect(id, { posX, posY });
  };

  const changeRotate = (id, position, transform) => {
    let rotate = Number(transform.replace(/[^0-9\.?-]+/g, '')) || 0;
    const res = position === 'right' ? rotate + 15 : rotate + -15;
    handleSelect(id, { transform: `rotate(${res}deg)` });
  };

  const changeSize = (id, ref) => {
    handleSelect(id, {
      height: parseInt(ref.style.height),
      width: parseInt(ref.style.width)
    });
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
              posX={data[id].posX}
              posY={data[id].posY}
              height={data[id].height}
              width={data[id].width}
              transform={data[id].transform}
              url={source + data[id].id + dimensions}
              handleRemove={handleRemove}
              changePosition={changePosition}
              changeSize={changeSize}
              changeRotate={changeRotate}
            />
          ))}
        </Drag>
      </View>
    </Wrapper>
  );
};

export default ViewStickers;
