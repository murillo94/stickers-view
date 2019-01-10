import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import stickers from './data/stickers.json';
import { source, dimensions } from './data/url';
import List from './components/List/List';
import ViewStickers from './components/View/ViewStickers';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    color: #333;
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  .react-autosuggest__container {
    position: relative;
    width: 100%;
  }

  .react-autosuggest__input {
    font-size: 12px;
    padding: 9px;
    border-radius: 8px;
    box-shadow: none;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    transition: all 0.1s ease-in;
    width: 100%;
  }

  .react-autosuggest__input--focused {
    outline: none;
    border-color: #c1c1c1;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    font-size: 14px;
    font-weight: 300;
    display: block;
    position: absolute;
    top: 35px;
    border: 1px solid #c1c1c1;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(180,180,180,0.1);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top: none;
    z-index: 2;
    max-height: 260px;
    overflow-y: auto;
    width: 99.5%;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 15px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #f6f6f6;
  }

  .react-autosuggest__suggestion--highlighted:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .react-autosuggest__section-container {
    border-top: 1px dashed #ccc;s
  }

  .react-autosuggest__section-container--first {
    border-top: 0;
  }

  .react-autosuggest__section-title {
    padding: 10px 0 0 10px;
    font-size: 12px;
    color: #777;
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

  ::-webkit-scrollbar-thumb:hover {
    background-color: #b7b7b7 !important;
  }

  ::-webkit-scrollbar-track {
    background-color: #eaeaea !important;
    border-radius: 20px;
  }

  img {
    user-select: none;
    pointer-events: none;
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

  handleSelect = (id, ...args) => {
    this.setState(prevState => {
      const list = { ...prevState.selected };
      const key = list[id] ? id : id + Object.keys(list).length;

      if (args.length > 0) {
        Object.keys(args[0]).map(value => {
          list[key][value] = args[0][value];
        });
      } else {
        list[key] = {
          id,
          posX: 25,
          posY: 25,
          height: 75,
          width: 75,
          transform: 'rotate(0deg)'
        };
      }

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
          handleSelect={this.handleSelect}
          handleRemove={this.handleRemove}
        />
      </Wrapper>
    );
  }
}

export default App;
