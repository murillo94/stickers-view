import React from 'react';
import styled from 'styled-components';
import Img from 'react-image';

import { source, dimensions } from '../../../data/url';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: 13px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const unloadMessage = 'Error :(';

const Image = ({ id, alt, height, width, loader, style }) => (
  <Img
    src={source + id + dimensions}
    alt={alt}
    height={height}
    width={width}
    loader={loader}
    unloader={unloadMessage}
    container={img => <Wrapper>{img}</Wrapper>}
    style={style}
  />
);

export default Image;
