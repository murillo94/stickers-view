import React, { useState } from 'react';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import Img from 'react-image';

import Filter from './Filter';
import Loader from './Loader';
import stickers from '../../data/stickers.json';
import { source, dimensions } from '../../data/url';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  background-color: #f6f6f6;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 27px;
  margin: 0 0 15px;
`;

const Inline = styled.div`
  width: 100%;
  display: flex;
`;

const Suggestion = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px -2px, rgba(0, 0, 0, 0.15) 0px 5px 15px -5px;
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

const getSuggestions = (value, list) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : list.filter(
        item =>
          item.title &&
          item.title.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = ({ title }) => title;

const renderSuggestion = ({ title, id }) => (
  <Suggestion>
    <BoxImage>
      <Img
        src={source + id + dimensions}
        alt={title}
        height={22}
        width={22}
        loader={<Loader height={22} width={22} />}
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
  const [filter, setFilter] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    if (newValue.length === 0) {
      const list = filter.length ? filter : stickers;
      actionSearch(list);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const list = filter.length ? filter : stickers;
    setSuggestions(getSuggestions(value, list));
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

  const onFilter = categories => {
    const list = categories.length
      ? stickers.filter(({ tags }) =>
          tags.some(name => categories.includes(name))
        )
      : stickers;
    setFilter(list);
    actionSearch(list);
  };

  return (
    <Wrapper>
      <Title>Choose your stickers</Title>
      <Inline>
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
            placeholder: 'Try "JavaScript"',
            value,
            onChange
          }}
        />
        <Filter onFilter={onFilter} />
      </Inline>
    </Wrapper>
  );
};

export default Search;
