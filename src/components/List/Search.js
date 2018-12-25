import React, { useState } from 'react';
import styled from 'styled-components';
import * as JsSearch from 'js-search';

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
  font-size: 27px;
  color: #333;
  margin: 0 0 15px;
  width: 100%;
`;

const Input = styled.input.attrs(props => {
  type: props.type;
})`
  font-size: 12px;
  padding: 9px;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #eaeaea;
  width: 95%;
  box-sizing: border-box;
  transition: all 0.2s linear;
  &:focus {
    outline: none;
    border-color: #bbbbbb;
`;

const Search = ({ data = [], actionSearch }) => {
  const [value, setValue] = useState('');

  let searchData = new JsSearch.Search('id');
  searchData.addIndex('title');
  searchData.addIndex('tags');
  searchData.addDocuments(data);

  const handleChange = e => {
    const res = e.target.value;
    setValue(res);
    actionSearch(res ? searchData.search(res) : data);
  };

  return (
    <Wrapper>
      <Title>Choose your stickers</Title>
      <Input type="search" onChange={handleChange} />
    </Wrapper>
  );
};

export default Search;
