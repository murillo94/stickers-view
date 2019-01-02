import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

const Dimension = styled.div`
  background-color: transparent;
  font-size: 13px;
  text-align: center;
  margin-top: 7px;
  cursor: default;
  pointer-events: none;
  user-select: none;
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

const Sticker = ({
  value,
  index,
  posX,
  posY,
  urlImage,
  setRef,
  handleRemove,
  changePosition,
  changeSize,
  changeRotate,
  changeTextDimension
}) => {
  return (
    <Draggable
      key={value}
      bounds="parent"
      handle=".handle"
      defaultPosition={{ x: posX, y: posY }}
      onStop={(e, { x, y }) => changePosition(value, x, y)}
    >
      <Item ref={value => setRef(value, 'dimension', index)}>
        <Resizable
          ref={value => setRef(value, 'rotate', index)}
          className="handle"
          style={{
            backgroundImage: `url(${urlImage})`,
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
            changeSize(index, ref);
            changeTextDimension(index, ref);
          }}
        />
        <Dimension ref={value => setRef(value, 'textDimension', index)}>
          75x75 (px)
        </Dimension>
        <OptionsView>
          <OptionButton onClick={() => handleRemove(value)}>
            <OptionIcon
              source="https://icon.now.sh/delete"
              title="Remove sticker"
            />
          </OptionButton>
          <OptionButton onClick={() => changeRotate(index, 'right')}>
            <OptionIcon
              source="https://icon.now.sh/rotate_right"
              title="Rotate right sticker"
            />
          </OptionButton>
          <OptionButton onClick={() => changeRotate(index, 'left')}>
            <OptionIcon
              source="https://icon.now.sh/rotate_left"
              title="Rotate left sticker"
            />
          </OptionButton>
        </OptionsView>
      </Item>
    </Draggable>
  );
};

export default Sticker;
