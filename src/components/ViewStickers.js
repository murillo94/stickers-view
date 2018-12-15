import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';

const macImage = require('../../assets/mac.png');

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.7;
  height: 100%;
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

const Item = styled.div`
  position: absolute;
  height: 70px;
  width: 70px;
  cursor: grab;
  &:hover {
    border: 2px dashed #c9c9c9;
  }
  &:active {
    cursor: grabbing;
  }
`;

const ViewStickers = ({
  data = [],
  source = '',
  dimensions = '',
  handleRemove = null
}) => (
  <Wrapper>
    <View>
      <Image src={macImage} />
      <Drag>
        {data.map((x, i) => (
          <Draggable
            key={i}
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: 25, y: 25 }}
          >
            <Item id={`sticker-${i}`}>
              <Resizable
                className="handle"
                style={{
                  backgroundImage: `url(${source + x.id + dimensions})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '70px',
                  width: '70px'
                }}
                defaultSize={{
                  width: 70,
                  height: 70
                }}
                lockAspectRatio
                onResize={(e, direction, ref, d) => {
                  document.getElementById(`sticker-${i}`).style.height =
                    ref.style.height;
                  document.getElementById(`sticker-${i}`).style.width =
                    ref.style.width;
                }}
                onDoubleClick={() => handleRemove(i)}
              />
            </Item>
          </Draggable>
        ))}
      </Drag>
    </View>
  </Wrapper>
);

export default ViewStickers;
