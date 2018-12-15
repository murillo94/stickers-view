import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0.3;
  height: 100%;
  background-color: #f2f2f2;
  border-right: 1px solid #eaeaea;
  overflow: hidden auto;
  @media (max-width: 991px) {
    flex-direction: column;
    height: 130px;
    overflow: auto hidden;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 80px;
  width: 80px;
  margin: 10px;
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

const List = ({
  data = [],
  source = '',
  dimensions = '',
  handleSelect = null
}) => (
  <Wrapper>
    {data.map((x, i) => (
      <Box key={i}>
        <Item
          title={x.title}
          id={x.id}
          source={source}
          dimensions={dimensions}
          onClick={() => handleSelect(x.id)}
        />
      </Box>
    ))}
  </Wrapper>
);

export default List;
