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
  source = '',
  dimensions = '',
  handleSelect = null,
  handleRemove = null
}) => {
  let refs = {
    dimension: [],
    size: [],
    textDimension: []
  };

  const setRef = (ref, type) => {
    if (ref) refs[type].push(ref);
  };

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

  const changeRefSize = (pos, ref) => {
    let itemDimension = refs.dimension[pos];
    let itemSize = refs.size[pos];
    itemDimension.style.height = ref.style.height;
    itemDimension.style.width = ref.style.width;
    itemSize.style.height = ref.style.height;
    itemSize.style.width = ref.style.width;
  };

  const changeRefTextDimension = (pos, ref) => {
    let item = refs.textDimension[pos];
    item.innerHTML = `${parseInt(ref.style.height)}x${parseInt(
      ref.style.width
    )} (px)`;
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
              index={key}
              posX={data[id].posX}
              posY={data[id].posY}
              height={data[id].height}
              width={data[id].width}
              transform={data[id].transform}
              url={source + data[id].id + dimensions}
              setRef={setRef}
              handleRemove={handleRemove}
              changePosition={changePosition}
              changeSize={changeSize}
              changeRotate={changeRotate}
              changeRefSize={changeRefSize}
              changeRefTextDimension={changeRefTextDimension}
            />
          ))}
        </Drag>
      </View>
    </Wrapper>
  );
};

export default ViewStickers;
