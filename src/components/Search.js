import React, { useState } from 'react';
import styled from 'styled-components';
import * as JsSearch from 'js-search';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const Input = styled.input`
  font-size: 12px;
  padding: 9px;
  border-radius: 100px;
  box-shadow: none;
  border: 1px solid #eaeaea;
  width: 85%;
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
      <Title>Stickers View</Title>
      <Input type="text" onChange={handleChange} />
    </Wrapper>
  );
};

export default Search;
