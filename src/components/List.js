import React, { Component } from 'react';
import styled from 'styled-components';
import { FixedSizeGrid, FixedSizeList } from 'react-window';

import Search from './Search';
import Cell from './Cell';

const COLUMN_WIDTH = 97;
const ROW_HEIGHT = 97;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 0.3;
  height: calc(100% - 122px);
  background-color: #f2f2f2;
  border-right: 1px solid #eaeaea;
  @media (max-width: 991px) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

class List extends Component {
  state = {
    height: 0,
    width: 0,
    fullWidth: 0,
    columns: 0,
    data: this.props.data,
    count: this.props.data.length
  };

  searchData = data => {
    while (data.length % this.state.columns) {
      data.push({ blank: true });
    }
    this.setState({ data, count: data.length });
  };

  renderCellGrid = ({ rowIndex, columnIndex, style }) => {
    const { source, dimensions, handleSelect } = this.props;
    const { data, columns } = this.state;
    const item = data[rowIndex * columns + columnIndex];
    if (!item.blank) {
      return <Cell {...{ item, style, source, dimensions, handleSelect }} />;
    }
    return null;
  };

  renderCellList = ({ index, style }) => {
    const { source, dimensions, handleSelect } = this.props;
    const { data } = this.state;
    const item = data[index];
    return <Cell {...{ item, style, source, dimensions, handleSelect }} />;
  };

  recalcSize = () => {
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

    this.setState({
      height,
      width,
      fullWidth,
      columns
    });
  };

  componentDidMount() {
    this.recalcSize();
    window.addEventListener('resize', this.recalcSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.recalcSize);
  }

  render() {
    const { fullWidth, columns, count, height, width, data } = this.state;

    return (
      <div>
        <Search data={this.props.data} actionSearch={this.searchData} />
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
              {this.renderCellGrid}
            </FixedSizeGrid>
          ) : (
            <FixedSizeList
              direction="horizontal"
              height={130}
              itemCount={data.length}
              itemSize={97}
              width={width}
            >
              {this.renderCellList}
            </FixedSizeList>
          )}
        </Wrapper>
      </div>
    );
  }
}

export default List;
