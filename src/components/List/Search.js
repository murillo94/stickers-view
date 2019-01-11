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

const Footer = styled.div`
  color: #ff596f;
  padding: 12px 20px;
  cursor: pointer;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  &:hover {
    background-color: #f6f6f6;
  }
`;

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : stickers.filter(
        item => item.title.toLowerCase().slice(0, inputLength) === inputValue
      );
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

const renderSuggestionsContainer = ({
  containerProps,
  children,
  query,
  onSuggestionSelectedAll
}) => (
  <div {...containerProps}>
    {children}
    {query.length > 0 ? (
      <Footer onClick={onSuggestionSelectedAll}>
        See results for <strong>{query}</strong>
      </Footer>
    ) : null}
  </div>
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

  const onSuggestionSelectedAll = () => {
    actionSearch(suggestions);
    setSuggestions([]);
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
        renderSuggestionsContainer={({ containerProps, children, query }) =>
          renderSuggestionsContainer({
            containerProps,
            children,
            query,
            onSuggestionSelectedAll
          })
        }
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
