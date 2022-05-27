import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col, List } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListItemContainer = styled.div`
  box-sizing: border-box;
  .ant-row {
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    .ant-list-item {
      align-items: flex-start;

      /* 이미지 영역 */
      .imgContainer {
        flex-shrink: 0;
        width: 10rem;
        height: 10rem;
        border-radius: 0.25rem;
        margin-right: 1rem;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: none;
        }
      }

      /* 텍스트 영역 */
      .textContainer {
        display: flex;
        flex-direction: column;
        .textTop {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.125rem;
          font-size: 1.125rem;
          line-height: 1.5;
          letter-spacing: -0.05rem;

          .mainTitle {
            margin-right: 0.5rem;
            font-weight: bold;
          }
        }

        .textBottom {
          display: flex;
          align-items: baseline;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.025rem;

          .subTitle {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
`;

const ListItem = ({ imgSrc, mainTitle, subTitle }) => {
  return (
    <ListItemContainer>
      <Col span={24}>
        <Row>
          <Link to="/">
            <List.Item>
              {/* 이미지 영역 */}
              <div className="imgContainer">
                <img alt="logo" src={imgSrc} />
              </div>

              {/* 텍스트 영역 */}
              <div className="textContainer">
                <div className="textTop">
                  <h3 className="mainTitle">{mainTitle}</h3>
                </div>
                <div className="textBottom">
                  <span className="subTitle">{subTitle}</span>
                </div>
              </div>
            </List.Item>
          </Link>
        </Row>
      </Col>
    </ListItemContainer>
  );
};

export default ListItem;
