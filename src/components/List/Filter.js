import React, { useState, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import stickers from '../../data/stickers.json';

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
  position: relative;
`;

const Close = styled.button.attrs(({ title }) => {
  title: title;
})`
  height: 38px;
  width: 38px;
  background-color: transparent;
  border: none;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Quantity = styled.div`
  height: 13px;
  width: 13px;
  font-size: 10px;
  color: #fff;
  background-color: #ff4c4c;
  border-radius: 10px;
  padding: 2px;
  position: absolute;
  top: -4px;
  right: -6px;
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
  user-select: none;
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
    background-color: #333;
    color: #fff;
  }
`;

const ContainerButtons = styled.div`
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 30px;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 14px;
  color: ${({ type }) => (type === 'save' ? '#fff' : '#333')};
  background-color: ${({ type }) => (type === 'save' ? '#333' : '#fff')};
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px 50px;
  transition: all 0.2s ease 0s;
  &:hover {
    box-shadow: rgb(107, 121, 137) 0px 0px 12px;
  }
`;

const getTags = () => {
  let unique = [
    ...new Set(
      stickers
        .map(({ tags }) => {
          return tags;
        })
        .reduce((x, y) => x.concat(y), [])
    )
  ];

  return unique.map(x => {
    return { name: x, isChecked: false };
  });
};

const Filter = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(getTags());

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
    if (event.keyCode === 27) setOpen(false);
  };

  const getQuantityChecked = () =>
    categories.filter(({ isChecked }) => isChecked).length;

  const handleCheckChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setCategories(prevState =>
      [...prevState].filter(x => {
        if (x.name === target.value) x.isChecked = value;
        return x;
      })
    );
  };

  const actionConfirm = () => {
    const list = categories
      .filter(({ isChecked }) => isChecked)
      .map(({ name }) => name);

    onFilter(list);
    setOpen(!open);
  };

  const actionClean = () => {
    setCategories(prevState =>
      [...prevState].filter(x => {
        if (x.isChecked) x.isChecked = false;
        return x;
      })
    );

    onFilter([]);
    setOpen(!open);
  };

  if (!open) {
    const quantity = getQuantityChecked();

    return (
      <Open
        onClick={openModal}
        source="https://icon.now.sh/filter_list/333"
        title="Open categories"
      >
        {quantity > 0 && <Quantity>{quantity}</Quantity>}
      </Open>
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
      {categories.map((item, index) => (
        <Label key={index}>
          <Checkbox
            type="checkbox"
            name="categories"
            value={item.name}
            checked={item.isChecked}
            onChange={handleCheckChange}
          />
          <span>{item.name}</span>
        </Label>
      ))}
      <ContainerButtons>
        <Button type="clean" onClick={actionClean}>
          Clean
        </Button>
        <Button type="save" onClick={actionConfirm}>
          Filter
        </Button>
      </ContainerButtons>
    </Wrapper>
  );
};

export default Filter;
