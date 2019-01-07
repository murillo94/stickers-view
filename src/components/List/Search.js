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
  width: 100%;
  font-size: 27px;
  margin: 0 0 15px;
`;

const Input = styled.input.attrs(props => {
  type: props.type;
})`
  width: 95%;
  font-size: 12px;
  padding: 9px;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  transition: all 0.1s ease-in;
  &:focus {
    outline: none;
    border-color: #c1c1c1;
    box-shadow: 0px 2px 5px rgba(180,180,180,0.1);
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
