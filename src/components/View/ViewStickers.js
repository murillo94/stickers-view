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
  let refs = {
    dimension: [],
    rotate: [],
    textDimension: []
  };

  const setRef = (ref, type, key) => {
    if (ref && !refs[type][key]) {
      const item = type === 'rotate' ? ref.resizable : ref;
      refs[type].push(item);
    }
  };

  const changePosition = (key, posX, posY) => {
    handleSelect(key, posX, posY);
  };

  const changeRotate = (pos, position) => {
    let item = refs.rotate[pos];
    let rotate = Number(item.style.transform.replace(/[^0-9\.?-]+/g, '')) || 0;
    const res = position === 'right' ? rotate + 15 : rotate + -15;
    item.style.transform = `rotate(${res}deg)`;
  };

  const changeSize = (pos, ref) => {
    let item = refs.dimension[pos];
    item.style.height = ref.style.height;
    item.style.width = ref.style.width;
  };

  const changeTextDimension = (pos, ref) => {
    let item = refs.textDimension[pos];
    item.innerHTML = `${parseInt(ref.style.height)}x
    ${parseInt(ref.style.width)} (px)`;
  };

  return (
    <Wrapper>
      <View>
        <Image src={macImage} />
        <Drag>
          {Object.keys(data).map((value, key) => (
            <Sticker
              key={key}
              value={value}
              index={key}
              posX={data[value].posX}
              posY={data[value].posY}
              urlImage={source + data[value].id + dimensions}
              setRef={setRef}
              handleRemove={handleRemove}
              changePosition={changePosition}
              changeSize={changeSize}
              changeRotate={changeRotate}
              changeTextDimension={changeTextDimension}
            />
          ))}
        </Drag>
      </View>
    </Wrapper>
  );
};

export default ViewStickers;
