import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { stickers } from './stickers.js';
import List from './components/List';
import ViewStickers from './components/ViewStickers';

const source = 'https://ih1.redbubble.net/image.';
const dimensions = '/st,extra_large,375x375.png';

const GlobalStyle = createGlobalStyle`
  html,
  body {
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
        <GlobalStyle />
        <List
          items={stickers}
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
