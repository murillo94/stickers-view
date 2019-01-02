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
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
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

const Image = styled.div`
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  transform: ${({ transform }) => transform};
`;

const Sticker = ({
  id,
  posX,
  posY,
  height,
  width,
  transform,
  url,
  handleRemove,
  changePosition,
  changeSize,
  changeRotate
}) => {
  return (
    <Draggable
      key={id}
      bounds="parent"
      handle=".handle"
      defaultPosition={{ x: posX, y: posY }}
      onStop={(e, { x, y }) => changePosition(id, x, y)}
    >
      <Item height={height} width={width}>
        <Resizable
          className="handle"
          defaultSize={{
            width: 75,
            height: 75
          }}
          lockAspectRatio
          onResize={(e, direction, ref, d) => {
            changeSize(id, ref);
          }}
        >
          <Image
            source={url}
            height={height}
            width={width}
            transform={transform}
          />
        </Resizable>
        <Dimension>
          {height}x{width} (px)
        </Dimension>
        <OptionsView>
          <OptionButton onClick={() => handleRemove(id)}>
            <OptionIcon
              source="https://icon.now.sh/delete"
              title="Remove sticker"
            />
          </OptionButton>
          <OptionButton onClick={() => changeRotate(id, 'right', transform)}>
            <OptionIcon
              source="https://icon.now.sh/rotate_right"
              title="Rotate right sticker"
            />
          </OptionButton>
          <OptionButton onClick={() => changeRotate(id, 'left', transform)}>
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
