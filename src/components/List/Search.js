import React, { useState } from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import Img from 'react-image';

import Loader from './Loader';
import stickers from '../../data/stickers.json';
import { source, dimensions } from '../../data/url';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  background-color: #eaeaea;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Title = styled.h1`
  width: 100%;
  font-size: 27px;
  margin: 0 0 15px;
`;

const Suggestion = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center';
`;

const BoxImage = styled.div`
  margin-right: 10px;
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  const regex = new RegExp('^' + escapedValue, 'i');

  return stickers.filter(item => regex.test(item.title));
};

const getSuggestionValue = ({ title }) => title;

const renderSuggestion = ({ title, id }) => (
  <Suggestion>
    <BoxImage>
      <Img
        src={source + id + dimensions}
        alt={title}
        height={18}
        width={18}
        loader={<Loader height={18} width={18} />}
        unloader={'Error :('}
        container={img => {
          return <Image>{img}</Image>;
        }}
      />
    </BoxImage>
    {title}
  </Suggestion>
);

const shouldRenderSuggestions = () => true;

const Search = ({ actionSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    if (newValue.length === 0) {
      actionSearch(stickers);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    actionSearch([suggestion]);
  };

  return (
    <Wrapper>
      <Title>Choose your stickers</Title>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        shouldRenderSuggestions={shouldRenderSuggestions}
        highlightFirstSuggestion={true}
        renderSuggestion={renderSuggestion}
        inputProps={{
          type: 'search',
          placeholder: 'Ex: JavaScript',
          value,
          onChange
        }}
      />
    </Wrapper>
  );
};

export default Search;
