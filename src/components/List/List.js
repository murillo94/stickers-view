import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FixedSizeGrid, FixedSizeList } from 'react-window';

import Search from './Search';
import Cell from './Cell';

const COLUMN_WIDTH = 97;
const ROW_HEIGHT = 97;

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  height: calc(100% - 122px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0.3;
  background-color: #f6f6f6;
  border-right: 1px solid #eaeaea;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 991px) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

const List = ({ data, handleAddSticker }) => {
  const [list, setList] = useState(data);
  const [count, setCount] = useState(data.length);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [columns, setColumns] = useState(0);

  useLayoutEffect(() => {
    recalcSize();

    window.addEventListener('resize', recalcSize);

    return () => {
      window.removeEventListener('resize', recalcSize);
    };
  }, []);

  const searchData = data => {
    while (data.length % columns) {
      data.push({ blank: true });
    }

    setList(data);
    setCount(data.length);
  };

  const renderCellGrid = ({ rowIndex, columnIndex, style }) => {
    const item = list[rowIndex * columns + columnIndex];

    return !item.blank ? <Cell {...{ item, style, handleAddSticker }} /> : null;
  };

  const renderCellList = ({ index, style }) => {
    const item = list[index];

    return <Cell {...{ item, style, handleAddSticker }} />;
  };

  const recalcSize = () => {
    const fullWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const initialWidth = (fullWidth * 30) / 100;
    const width =
      fullWidth > 991
        ? initialWidth
        : document.getElementById('list').clientWidth;
    const height = document.getElementById('list').offsetHeight;
    const columns = Math.floor(width / COLUMN_WIDTH);

    setHeight(height);
    setWidth(width);
    setFullWidth(fullWidth);
    setColumns(columns);
  };

  return (
    <Container>
      <Search actionSearch={searchData} />
      <Wrapper id="list">
        {fullWidth > 991 ? (
          <FixedSizeGrid
            columnCount={columns}
            columnWidth={COLUMN_WIDTH}
            rowCount={Math.floor(count / columns)}
            rowHeight={ROW_HEIGHT}
            height={height}
            width={width}
          >
            {renderCellGrid}
          </FixedSizeGrid>
        ) : (
          <FixedSizeList
            direction="horizontal"
            height={130}
            itemCount={list.length}
            itemSize={97}
            width={width}
            style={{ padding: '0 20px' }}
          >
            {renderCellList}
          </FixedSizeList>
        )}
      </Wrapper>
    </Container>
  );
};

export default List;
