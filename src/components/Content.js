import React from 'react';
import styled from 'styled-components';

import Router from './Router';

const ContentContainer = styled.main`
  display: block;
  min-height: 80vh;
`;

const Content = () => {
  return (
    <ContentContainer>
      <div className="inner">
        <Router />
      </div>
    </ContentContainer>
  );
};

export default Content;
