import React from 'react';
import styled from 'styled-components';

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

const Search = () => (
  <Wrapper>
    <Title>Stickers View</Title>
    <Input type="text" />
  </Wrapper>
);

export default Search;
