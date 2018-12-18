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
  margin-top: 5px;
  opacity: 0;
`;

const Item = styled.div`
  position: absolute;
  height: 70px;
  width: 70px;
  cursor: grab;
  &:hover {
    border: 2px dashed #c9c9c9;
    ${Dimension} {
      opacity: 1;
    }
  }
  &:active {
    cursor: grabbing;
  }
`;

const findId = id => document.getElementById(id);

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
        {data.map((item, index) => (
          <Draggable
            key={index}
            bounds="parent"
            handle=".handle"
            defaultPosition={{ x: 25, y: 25 }}
          >
            <Item id={`sticker-${index}`}>
              <Resizable
                className="handle"
                style={{
                  backgroundImage: `url(${source + item.id + dimensions})`,
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
                  findId(`sticker-${index}`).style.height = ref.style.height;
                  findId(`sticker-${index}`).style.width = ref.style.width;
                  findId(`dimension-${index}`).innerHTML = `${parseInt(
                    ref.style.height
                  )}x${parseInt(ref.style.width)} (px)`;
                }}
                onDoubleClick={() => handleRemove(index)}
              />
              <Dimension id={`dimension-${index}`}>70x70 (px)</Dimension>
            </Item>
          </Draggable>
        ))}
      </Drag>
    </View>
  </Wrapper>
);

export default ViewStickers;
