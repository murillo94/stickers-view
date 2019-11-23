import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import List from './components/List/List';
import ViewStickers from './components/View/ViewStickers';

import stickers from './data/stickers.json';

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
    font-weight: 500;
    background-color: #eaeaea;
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

  button {
    cursor: pointer;
  }

  button:focus {
    outline: none;
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

const App = () => {
  const [selectedStickers, setSelectedStickers] = useState({});

  const handleAddSticker = id => {
    const list = { ...selectedStickers };
    const listLength = Object.keys(list).length;
    const key = id + listLength;

    list[key] = { id };

    setSelectedStickers(list);
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <List data={stickers} handleAddSticker={handleAddSticker} />
      <ViewStickers data={selectedStickers} />
    </Wrapper>
  );
};

export default App;
