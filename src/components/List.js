import React, { Component } from 'react';
import styled from 'styled-components';
import { FixedSizeGrid } from 'react-window';

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
    flex-direction: column;
    height: 130px;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;

class List extends Component {
  state = {
    columns: 0,
    width: 0,
    height: 0,
    items: {},
    count: this.props.items.length
  };

  renderCell = ({ rowIndex, columnIndex, style }) => {
    const { items, source, dimensions, handleSelect } = this.props;
    const item = items[rowIndex * this.state.columns + columnIndex];
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
      width,
      height,
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
    return (
      <div>
        <Search />
        <Wrapper id="list">
          <FixedSizeGrid
            columnCount={this.state.columns}
            columnWidth={COLUMN_WIDTH}
            height={this.state.height}
            rowCount={Math.floor(this.state.count / this.state.columns)}
            rowHeight={ROW_HEIGHT}
            width={this.state.width}
          >
            {this.renderCell}
          </FixedSizeGrid>
        </Wrapper>
      </div>
    );
  }
}

export default List;
