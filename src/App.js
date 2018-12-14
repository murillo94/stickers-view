import React, { Component } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import Resizable from 're-resizable';

import { stickers } from './stickers.js';

const source = 'https://ih1.redbubble.net/image.';
const dimensions = '/st,extra_large,375x375.png';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 991px) {
    display: block;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0.3;
  height: 100%;
  background-color: #f2f2f2;
  border-right: 1px solid #eaeaea;
  overflow: hidden auto;
  @media (max-width: 991px) {
    flex-direction: column;
    height: 130px;
    overflow: auto hidden;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 80px;
  width: 80px;
  margin: 10px;
`;

const ListItem = styled.div.attrs(props => {
  title: props.title;
})`
  background-image: url(${({ id }) => source + id + dimensions});
  background-size: contain;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  cursor: pointer;
  transition: transform 0.25s;
  will-change: transform;
  &:hover {
    transform: translateY(-10px);
  }
`;

const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.7;
  height: 100%;
  position: relative;
`;

const ViewPC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 85%;
`;

const ImagePC = styled.img`
  width: 100%;
`;

const ViewDrag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ViewItem = styled.div`
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

class App extends Component {
  state = {
    stickers: stickers,
    selected: []
  };

  handleSelect = id => {
    this.setState(prevState => ({
      selected: [...prevState.selected, { id }]
    }));
  };

  handleRemove = index => {
    this.setState(prevState => ({
      selected: [...prevState.selected.filter((x, i) => i !== index)]
    }));
  };

  render() {
    const { stickers, selected } = this.state;

    return (
      <Wrapper>
        <List>
          {stickers.map((x, i) => (
            <ListBox key={i}>
              <ListItem
                id={x.id}
                title={x.title}
                onClick={() => this.handleSelect(x.id)}
              />
            </ListBox>
          ))}
        </List>
        <View>
          <ViewPC>
            <ImagePC src="https://stackstickers.shop/mac.png" />
            <ViewDrag>
              {selected.map((x, i) => (
                <Draggable
                  key={i}
                  bounds="parent"
                  handle=".handle"
                  defaultPosition={{ x: 25, y: 25 }}
                >
                  <ViewItem id={`sticker-${i}`}>
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
                      onDoubleClick={() => this.handleRemove(i)}
                    />
                  </ViewItem>
                </Draggable>
              ))}
            </ViewDrag>
          </ViewPC>
        </View>
      </Wrapper>
    );
  }
}

export default App;
