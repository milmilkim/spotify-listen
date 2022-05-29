import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsLogin, setToken } from '../slices/TokenSlice';

import styled from 'styled-components';

import { getTop } from '../slices/Top';

import logo from '../assets/img/Spotify_Logo.png';

import { Button, Space } from 'antd';

import background from '../assets/img/background.jpg';

import Spinner from '../components/Spinner';

import { convertMs } from '../components/ListItem';
import html2canvas from 'html2canvas';

const ReceiptMakingContainer = styled.div`
  @font-face {
    font-family: 'ParkYongJun';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/ParkYongJun.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  padding: 10px;

  .spotify-logo img {
    width: 150px;
  }
  .flex-row {
    justify-content: space-around;
    align-items: center;
  }

  .receipt-img {
    font-family: 'ParkYongJun';
    display: flex;
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    background: url(${background}) no-repeat;
    background-position: center;
    background-size: 100%;

    h2 {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      font-size: 12px;
      margin-bottom: 10px;

      .item-1 .itme-2 {
        padding: 0 5px 0 5px;
      }

      .item-1 {
        width: 70%;
      }
      .item-2 {
        width: 30%;
        text-align: right;
      }
    }
  }
`;

const ReceiptMaking = ({ token }) => {
  const { isLogin } = useSelector((state) => state.token);
  const { data, isLoading } = useSelector((state) => state.top);

  const dispatch = useDispatch();

  const ref = useRef();

  useEffect(() => {
    dispatch(setToken(token));
    dispatch(setIsLogin(true));
    console.log(isLogin);

    return () => {
      dispatch(setIsLogin(false));
    };
  }, [dispatch, isLogin, token]);

  /**
   * 이제 로그인 성공 여부를 isLogin으로 체크하고
   * 맞다면 영수증 제작 화면 출력 -> 기간 설정 버튼 띄워준 후
   * 기간 버튼을 클릭하면 해당 정보를 다시 params로 서버에 전송하고 ->
   * 해당 기간에 맞는 데이터를 로드해오는... 식으로 일단 개념상으로는 정리가 되는데요,
   * 구체적으로 어떤 코드를 사용해야할지 막막해서 도움 요청드립니다.
   */

  const getTimeRange = (time_range) => {
    dispatch(
      getTop({
        token,
        time_range,
      })
    );
  };

  const captureImg = () => {
    let url = '';
    html2canvas(ref.current).then((canvas) => {
      url = canvas.toDataURL('image/jpg');

      onSaveAs(url, 'image.jpg');
    });

    const onSaveAs = (url, filename) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = url;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <ReceiptMakingContainer>
      <div className="flex-row">
        <div className="img-container">
          <div className="spotify-logo">
            <img src={logo} alt="spotify" />
          </div>
          <Spinner visible={isLoading} />
          <div className="receipt-img" ref={ref}>
            <h2>들어보세요</h2>
            {data.items &&
              data.items.map(({ name, artists, id, duration_ms }) => (
                <div className="container" key={id}>
                  <div className="item-1">
                    {name}-{artists[0].name}
                  </div>
                  <div className="item-2">{convertMs(duration_ms)}</div>
                </div>
              ))}
          </div>
          <Button style={{ marginTop: '20px' }} onClick={captureImg}>
            다운로드
          </Button>
        </div>

        <div className="btn-container">
          <h2>기간 설정</h2>
          <br />
          <Space>
            <Button
              onClick={() => {
                getTimeRange('long_term');
              }}
            >
              전체 기간
            </Button>
            <Button
              onClick={() => {
                getTimeRange('medium_term');
              }}
            >
              최근 6개월
            </Button>
            <Button
              onClick={() => {
                getTimeRange('short_term');
              }}
            >
              최근 4주
            </Button>
          </Space>
        </div>
      </div>
    </ReceiptMakingContainer>
  );
};

export default ReceiptMaking;
