import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  text-align: center;

  .title {
    margin: 30px;
    font-size: 40px;
  }

  ul.flex-row {
    justify-content: center;
    margin-bottom: 30px;
    font-size: 12px;

    li {
      margin: 0 40px;

      a:hover {
        font-weight: bold;
        color: rgb(142, 68, 173);
      }
    }
  }

  hr {
    width: 10px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div className="inner">
        <h1 className="title">들어보세요...</h1>
        <nav>
          <ul className="flex-row">
            <li>
              <Link to="/login">영수증</Link>
            </li>
            <li>
              <Link to="/search">곡검색</Link>
            </li>
            <li>
              <Link to="/recommend">추천</Link>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
    </HeaderContainer>
  );
};

export default Header;
