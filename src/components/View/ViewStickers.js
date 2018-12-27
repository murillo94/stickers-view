import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

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
`;

const Drag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Dimension = styled.div`
  background-color: transparent;
  font-size: 13px;
  text-align: center;
  margin-top: 7px;
  cursor: default;
  opacity: 0;
`;

const OptionsView = styled.div`
  position: absolute;
  right: -36px;
  top: -5px;
  bottom: 0;
  height: calc(100% + 5px);
  width: 20px;
  padding: 3px 5px;
  cursor: default;
`;

const OptionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  height: 20px;
  width: 20px;
  margin-bottom: 7px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    background-color: #f6f6f6;
  }
`;

const OptionIcon = styled.div.attrs(props => {
  title: props.title;
})`
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  height: 14px;
  width: 14px;
  pointer-events: none;
  user-select: none;
`;

const Item = styled.div`
  position: absolute;
  height: 75px;
  width: 75px;
  cursor: grab;
  &:hover {
    border: 2px dashed #c9c9c9;
    ${Dimension} {
      opacity: 1;
    }
    ${OptionButton} {
      opacity: 1;
    }
  }
  &:active {
    cursor: grabbing;
  }
`;

const changeRotate = (elem, position) => {
  let rotate = Number(elem.style.transform.replace(/[^0-9\.?-]+/g, '')) || 0;
  const res = position === 'right' ? rotate + 15 : rotate + -15;
  elem.style.transform = `rotate(${res}deg)`;
};

const changeSize = (elem, ref) => {
  elem.style.height = ref.style.height;
  elem.style.width = ref.style.width;
};

const changeTextDimension = (elem, ref) => {
  elem.innerHTML = `${parseInt(ref.style.height)}x
  ${parseInt(ref.style.width)} (px)`;
};

const ViewStickers = ({
  data = [],
  source = '',
  dimensions = '',
  handleRemove = null
}) => {
  let refs = {
    dimension: [],
    rotate: [],
    textDimension: []
  };

  const setRef = (ref, type) => {
    if (ref) {
      const item = type === 'rotate' ? ref.resizable : ref;
      refs[type].push(item);
    }
  };

  return (
    <Wrapper>
      <View>
        <Image src={macImage} />
        <Drag>
          {Object.keys(data).map((index, key) => (
            <Draggable
              key={index}
              bounds="parent"
              handle=".handle"
              defaultPosition={{ x: 25, y: 25 }}
            >
              <Item ref={value => setRef(value, 'dimension')}>
                <Resizable
                  ref={value => setRef(value, 'rotate')}
                  className="handle"
                  style={{
                    backgroundImage: `url(${source +
                      data[index] +
                      dimensions})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    height: '75px',
                    width: '75px'
                  }}
                  defaultSize={{
                    width: 75,
                    height: 75
                  }}
                  lockAspectRatio
                  onResize={(e, direction, ref, d) => {
                    changeSize(refs.dimension[key], ref);
                    changeTextDimension(refs.textDimension[key], ref);
                  }}
                />
                <Dimension ref={value => setRef(value, 'textDimension')}>
                  75x75 (px)
                </Dimension>
                <OptionsView>
                  <OptionButton onClick={() => handleRemove(index)}>
                    <OptionIcon
                      source="https://icon.now.sh/delete"
                      title="Remove sticker"
                    />
                  </OptionButton>
                  <OptionButton
                    onClick={() => changeRotate(refs.rotate[key], 'right')}
                  >
                    <OptionIcon
                      source="https://icon.now.sh/rotate_right"
                      title="Rotate right sticker"
                    />
                  </OptionButton>
                  <OptionButton
                    onClick={() => changeRotate(refs.rotate[key], 'left')}
                  >
                    <OptionIcon
                      source="https://icon.now.sh/rotate_left"
                      title="Rotate left sticker"
                    />
                  </OptionButton>
                </OptionsView>
              </Item>
            </Draggable>
          ))}
        </Drag>
      </View>
    </Wrapper>
  );
};

export default ViewStickers;
