import React from 'react';
import styled from 'styled-components';

import { Row, Col, List } from 'antd';

import { Link } from 'react-router-dom';

const ListItemContainer = styled.div`
  box-sizing: border-box;
  background-color: #f9f9f9;
  .ant-row {
    padding: 15px;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
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
          font-size: 1.438rem;
          line-height: 1.5;
          letter-spacing: -0.05rem;

          .mainTitle {
            margin-right: 0.5rem;
            margin-bottom: 0.5em;
            font-weight: bold;
          }
        }

        .textBottom {
          display: flex;
          align-items: baseline;
          font-size: 1.125rem;
          line-height: 1.5;
          letter-spacing: -0.025rem;

          .subTitle {
            margin-right: 0.5rem;
          }
        }

        .textExtra {
          .duration {
            font-size: 0.875rem;
          }

          .releaseDate {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
`;

/* 곡 재생시간(밀리초)를 분과 초로 변환하는 함수 */
function convertMs(ms) {
  let duration = '';
  let min = parseInt((ms / (1000 * 60)) % 60);
  let sec = parseInt((ms / 1000) % 60);

  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  duration = `${min} : ${sec}`;

  return duration;
}

const ListItem = ({ id, imgSrc, mainTitle, subTitle, duration, releaseDate }) => {
  return (
    <ListItemContainer>
      <Col span={24}>
        <Link to={`/search_result/${id}`}>
          <Row>
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
                <div className="textExtra">
                  {duration && <span className="duration">{convertMs(duration)}</span>}
                  <br />
                  {releaseDate && <span className="releaseDate">{releaseDate}</span>}
                </div>
              </div>
            </List.Item>
          </Row>
        </Link>
      </Col>
    </ListItemContainer>
  );
};

export default ListItem;
