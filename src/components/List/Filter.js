import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
  padding: 20px;
  z-index: 1;
  visibility: visible;
  animation: ${FadeIn} 0.15s linear;
  transition: visibility 0.15s linear;
  will-change: auto;
`;

const Open = styled.div.attrs(({ title }) => {
  title: title;
})`
  height: 30px;
  width: 30px;
  border: none;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 4px 0 0 15px;
  cursor: pointer;
`;

const Close = styled.div.attrs(({ title }) => {
  title: title;
})`
  height: 45px;
  width: 45px;
  border: none;
  background-image: url(${({ source }) => source});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Filter = ({ actionShow }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
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
    </Wrapper>
  );
};

export default Filter;
