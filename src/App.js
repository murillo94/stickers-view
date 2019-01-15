import React, { useReducer } from 'react';
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
    letter-spacing: 0.5px;
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
    border-color: #d9d9d9;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    font-size: 14px;
    font-weight: 300;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 8px 0px, rgba(0, 0, 0, 0.19) 0px 7px 20px 0px;
    border-radius: 8px;
    display: block;
    position: absolute;
    top: 45px;
    max-height: 280px;
    overflow-y: auto;
    width: 99.5%;
    z-index: 1;
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

  img {
    user-select: none;
    pointer-events: none;
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

  ::placeholder {
    color: #8e8e8e;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 991px) {
    display: block;
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      let { id } = action;
      const list = { ...state };
      const key = list[id] ? id : id + Object.keys(list).length;

      list[key] = {
        id,
        posX: 25,
        posY: 25,
        height: 75,
        width: 75,
        transform: 'rotate(0deg)'
      };

      return list;
    }
    case 'move': {
      let { id, args } = action;
      const list = { ...state };
      const key = list[id] ? id : id + Object.keys(list).length;

      Object.keys(args[0]).map(value => {
        list[key][value] = args[0][value];
      });

      return list;
    }
    case 'remove': {
      let { index } = action;
      const list = { ...state };
      const listFiltered = Object.keys(list)
        .filter(key => key !== index)
        .reduce((obj, key) => {
          obj[key] = list[key];
          return obj;
        }, {});
      return listFiltered;
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [selected, dispatch] = useReducer(reducer, []);

  const handleSelect = (id, ...args) => {
    if (args.length > 0) {
      dispatch({ type: 'move', id, args });
    } else {
      dispatch({ type: 'add', id });
    }
  };

  const handleRemove = index => {
    dispatch({ type: 'remove', index });
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <List
        data={stickers}
        source={source}
        dimensions={dimensions}
        handleSelect={handleSelect}
      />
      <ViewStickers
        data={selected}
        source={source}
        dimensions={dimensions}
        handleSelect={handleSelect}
        handleRemove={handleRemove}
      />
    </Wrapper>
  );
};

export default App;
