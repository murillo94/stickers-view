import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 80px;
  width: 80px;
  margin: 20px;
`;

const Item = styled.div.attrs(props => {
  title: props.title;
})`
  background-image: url(${({ source, id, dimensions }) =>
    source + id + dimensions});
  background-size: contain;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  cursor: pointer;
  transition: transform 0.25s;
  will-change: transform;
  &:hover {
    transform: translateY(-10px);
  }
`;

const Cell = ({
  item = {},
  style = {},
  source = '',
  dimensions = '',
  handleSelect = null
}) => (
  <div style={style}>
    <Box>
      <Item
        title={item.title}
        id={item.id}
        source={source}
        dimensions={dimensions}
        onClick={() => handleSelect(item.id)}
      />
    </Box>
  </div>
);

export default Cell;
