import React, { useState, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import stickers from '../../data/stickers.json';
import { type } from 'os';

const FadeIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  position: absolute;
  top: 0;
  right: 0;
  left: 0
  bottom: 0;
  padding: 20px 20px 0;
  z-index: 1;
  visibility: visible;
  animation: ${FadeIn} 0.15s linear;
  transition: visibility 0.15s linear;
  will-change: auto;
  overflow: hidden auto;
`;

const Open = styled.button.attrs(({ title }) => {
  title: title;
})`
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 4px 0 0 15px;
`;

const Close = styled.button.attrs(({ title }) => {
  title: title;
})`
  height: 40px;
  width: 40px;
  background-color: transparent;
  border: none;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  font-size: 27px;
  margin: 30px 10px 20px;
`;

const Label = styled.label`
  font-size: 14px;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 8px 0;
  margin: 10px;
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Checkbox = styled.input.attrs(({ type }) => {
  type: type;
})`
  display: none;
  & + span {
    padding: 8px 15px;
    border-radius: 7px;
  }
  &:checked + span {
    background: #333;
    color: #fff;
  }
`;

const ContainerSave = styled.div`
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 30px;
  margin-top: 20px;
`;

const Save = styled.button`
  font-size: 14px;
  color: #fff;
  background-color: #333;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px 50px;
  transition: all 0.2s ease 0s;
  &:hover {
    box-shadow: rgb(107, 121, 137) 0px 0px 12px;
  }
`;

const getTags = () => {
  return [
    ...new Set(
      stickers
        .map(({ tags }) => {
          return tags;
        })
        .reduce((x, y) => x.concat(y), [])
    )
  ];
};

const Filter = () => {
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    window.addEventListener('keydown', escModal, false);
    return () => {
      window.removeEventListener('keydown', escModal, false);
    };
  }, []);

  const openModal = () => {
    setOpen(!open);
  };

  const escModal = event => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  };

  if (!open) {
    return (
      <Open
        onClick={openModal}
        source="https://icon.now.sh/filter_list/333"
        title="Open categories"
      />
    );
  }

  return (
    <Wrapper>
      <Close
        onClick={openModal}
        source="https://icon.now.sh/close/333"
        title="Close categories"
      />
      <Title>Filter by Categories</Title>
      {getTags().map((item, index) => (
        <Label key={index}>
          <Checkbox type="checkbox" name="categories" value={item} />
          <span>{item}</span>
        </Label>
      ))}
      <ContainerSave>
        <Save>Filter</Save>
      </ContainerSave>
    </Wrapper>
  );
};

export default Filter;
