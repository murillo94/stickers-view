import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

const Dimension = styled.div`
  font-size: 13px;
  background-color: transparent;
  text-align: center;
  margin-top: 7px;
  cursor: default;
  pointer-events: none;
  user-select: none;
  opacity: 0;
`;

const OptionsView = styled.div`
  height: calc(100% + 5px);
  width: 20px;
  position: absolute;
  right: -36px;
  top: -5px;
  bottom: 0;
  padding: 3px 5px;
  cursor: default;
`;

const OptionButton = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-bottom: 7px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    background-color: #f6f6f6;
  }
`;

const OptionIcon = styled.div.attrs(({ title }) => {
  title: title;
})`
  height: 14px;
  width: 14px;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  user-select: none;
`;

const Wrapper = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  position: absolute;
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
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  transform: ${({ transform }) => transform};
`;

const Sticker = ({
  id,
  index,
  posX,
  posY,
  height,
  width,
  transform,
  url,
  setRef,
  handleRemove,
  changePosition,
  changeSize,
  changeRotate,
  changeRefSize,
  changeRefTextDimension
}) => (
  <Draggable
    key={id}
    bounds="parent"
    handle=".handle"
    defaultPosition={{ x: posX, y: posY }}
    onStop={(e, { x, y }) => changePosition(id, x, y)}
  >
    <Wrapper
      ref={value => setRef(value, 'dimension')}
      height={height}
      width={width}
    >
      <Resizable
        className="handle"
        defaultSize={{
          height: 75,
          width: 75
        }}
        lockAspectRatio
        onResize={(e, direction, ref, d) => {
          changeRefSize(index, ref);
          changeRefTextDimension(index, ref);
        }}
        onResizeStop={(e, direction, ref, d) => {
          changeSize(id, ref);
        }}
      >
        <Image
          ref={value => setRef(value, 'size')}
          source={url}
          height={height}
          width={width}
          transform={transform}
        />
      </Resizable>
      <Dimension ref={value => setRef(value, 'textDimension')}>
        {height}x{width} (px)
      </Dimension>
      <OptionsView>
        <OptionButton onClick={() => handleRemove(id)}>
          <OptionIcon
            source="https://icon.now.sh/delete/333"
            title="Remove sticker"
          />
        </OptionButton>
        <OptionButton onClick={() => changeRotate(id, 'right', transform)}>
          <OptionIcon
            source="https://icon.now.sh/rotate_right/333"
            title="Rotate right sticker"
          />
        </OptionButton>
        <OptionButton onClick={() => changeRotate(id, 'left', transform)}>
          <OptionIcon
            source="https://icon.now.sh/rotate_left/333"
            title="Rotate left sticker"
          />
        </OptionButton>
      </OptionsView>
    </Wrapper>
  </Draggable>
);

export default Sticker;
