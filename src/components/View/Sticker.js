import React, { memo, useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

import Image from '../shared/Image';

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
  height: ${({ height }) => height};
  width: ${({ width }) => width};
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

const Sticker = memo(
  ({ id, urlId }) => {
    const [dimensions, setDimensios] = useState({
      height: '75px',
      width: '75px'
    });
    const [position, setPosition] = useState({
      posX: 25,
      posY: 25
    });
    const [transform, setTransform] = useState({
      transform: 'rotate(0deg)'
    });
    const [visible, setVisible] = useState(true);

    const { height, width } = dimensions;
    const { posX, posY } = position;

    const changePosition = (posX, posY) => {
      setPosition({
        posX,
        posY
      });
    };

    const changeRefSize = ref => {
      const { height, width } = ref.style;

      setDimensios({
        height,
        width
      });
    };

    const changeRotate = (position, transform) => {
      const rotate = Number(transform.replace(/[^0-9\.?-]+/g, '')) || 0;
      const res = position === 'right' ? rotate + 15 : rotate + -15;

      setTransform({ transform: `rotate(${res}deg)` });
    };

    const handleRemove = () => {
      setVisible(!visible);
    };

    return (
      <>
        {visible ? (
          <Draggable
            key={id}
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: posX, y: posY }}
            onStop={(e, { x, y }) => changePosition(x, y)}
          >
            <Wrapper height={height} width={width}>
              <Resizable
                className="handle"
                lockAspectRatio
                defaultSize={{
                  height: 75,
                  width: 75
                }}
                onResize={(e, direction, ref, d) => {
                  changeRefSize(ref);
                }}
              >
                <Image
                  id={urlId}
                  height={height}
                  width={width}
                  style={{ transform }}
                />
              </Resizable>
              <Dimension>
                {height}x{width} (px)
              </Dimension>
              <OptionsView>
                <OptionButton onClick={handleRemove}>
                  <OptionIcon
                    source="https://icon.now.sh/delete/333"
                    title="Remove sticker"
                  />
                </OptionButton>
                <OptionButton onClick={() => changeRotate('right', transform)}>
                  <OptionIcon
                    source="https://icon.now.sh/rotate_right/333"
                    title="Rotate right sticker"
                  />
                </OptionButton>
                <OptionButton onClick={() => changeRotate('left', transform)}>
                  <OptionIcon
                    source="https://icon.now.sh/rotate_left/333"
                    title="Rotate left sticker"
                  />
                </OptionButton>
              </OptionsView>
            </Wrapper>
          </Draggable>
        ) : null}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);

export default Sticker;
