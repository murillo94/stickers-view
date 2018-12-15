import React, { PureComponent } from 'react';
import VirtualList from 'react-virtual-list';
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

const ConfigurableExample = MyList => {
  let MyVirtualList = VirtualList()(MyList);

  return class MyConfigurableList extends PureComponent {
    state = {
      container: this.refs.container
    };

    MyVirtualList = VirtualList(this.state)(MyList);

    render() {
      const {
        items,
        itemHeight,
        source,
        dimensions,
        handleSelect
      } = this.props;

      return (
        <div>
          <Wrapper ref="container">
            <MyVirtualList
              items={items}
              itemHeight={itemHeight}
              itemBuffer={10}
              source={source}
              dimensions={dimensions}
              handleSelect={handleSelect}
            />
          </Wrapper>
        </div>
      );
    }
  };
};

export default ConfigurableExample;
