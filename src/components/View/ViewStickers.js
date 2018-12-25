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

const Options = styled.div`
  position: absolute;
  right: -30px;
  top: -3px;
  bottom: 0;
  height: calc(100% + 5px);
  width: 20px;
  cursor: default;
`;

const Remove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  height: 20px;
  width: 20px;
  cursor: pointer;
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
    ${Remove} {
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
        {Object.keys(data).map(index => (
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
                  backgroundImage: `url(${source + data[index] + dimensions})`,
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
              />
              <Dimension id={`dimension-${index}`}>70x70 (px)</Dimension>
              <Options>
                <Remove onClick={() => handleRemove(index)}>x</Remove>
              </Options>
            </Item>
          </Draggable>
        ))}
      </Drag>
    </View>
  </Wrapper>
);

export default ViewStickers;
