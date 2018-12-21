import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import update from 'immutability-helper';

import { stickers } from './stickers.js';
import List from './components/List';
import ViewStickers from './components/ViewStickers';

const source = 'https://ih1.redbubble.net/image.';
const dimensions = '/st,extra_large,375x375.png';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5 !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc !important;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: #eaeaea !important;
    border-radius: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 991px) {
    display: block;
  }
`;

class App extends Component {
  state = {
    stickers: stickers,
    selected: []
  };

  handleSelect = id => {
    this.setState(prevState => {
      const list = { ...prevState.selected };
      const length = Object.keys(list).length;
      list[id + length] = id;
      return {
        selected: list
      };
    });
  };

  handleRemove = index => {
    this.setState(prevState => {
      const list = { ...prevState.selected };
      const listFiltered = Object.keys(list)
        .filter(key => key !== index)
        .reduce((obj, key) => {
          obj[key] = list[key];
          return obj;
        }, {});
      return {
        selected: listFiltered
      };
    });
  };

  render() {
    const { stickers, selected } = this.state;

    return (
      <Wrapper>
        <GlobalStyle />
        <List
          data={stickers}
          source={source}
          dimensions={dimensions}
          handleSelect={this.handleSelect}
        />
        <ViewStickers
          data={selected}
          source={source}
          dimensions={dimensions}
          handleRemove={this.handleRemove}
        />
      </Wrapper>
    );
  }
}

export default App;
