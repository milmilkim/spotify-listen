<<<<<<< HEAD
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setIsLogin, setToken } from "../slices/TokenSlice";

import styled from "styled-components";
=======
import React from 'react';
import styled from 'styled-components';
>>>>>>> 376e98e24b0ca2dad42dc0dacc9e5c7ed337c75f

const ReceiptMakingContainer = styled.div`
  padding: 10px;

  .flex-row {
    justify-content: space-around;
    align-items: center;
  }

  .receipt-img {
    display: block;
    width: 300px;
    height: 300px;
    border: 1px solid #ccc;
  }
`;

const ReceiptMaking = () => {
  const hash = new URL(window.location.href).hash.split("&")[0];
  const token = hash.split("=")[1];
  const { isLogin } = useSelector((state) => state.token);

  const dispatch = useDispatch();

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

  const getTimeRange = useCallback((e) => {
    console.log(e.target.value);
  });

  return (
    <ReceiptMakingContainer>
<<<<<<< HEAD
      <div className="flex-row">
        <div className="img-container">
          <div className="spotify-logo">여기에 스포티파이 로고</div>
          <div className="receipt-img">
            <h2>들어보세요</h2>
            {/* <h3>{timeRanges}</h3> */}
            {/* <p>ORDER #000{btnValue}</p> */}
            {/* <p>{date}</p> */}
          </div>
          <button type="button" className="btn">
            다운로드
          </button>
        </div>

        <div className="btn-container">
          <h2>기간 설정</h2>
          <button type="button" className="btn" value="last-week" onClick={getTimeRange}>
            최근 일주일
          </button>
          <button type="button" className="btn" value="last-month" onClick={getTimeRange}>
            최근 한달
          </button>
          <button type="button" className="btn" value="last-half-year" onClick={getTimeRange}>
            최근 반년
          </button>
        </div>
      </div>
=======
      {/* <div className="receipt">
        <h2>들어보세요</h2>
        <h3>{timeRanges}</h3>
        <p>ORDER #000{btnValue}</p>
        <p>{date}</p>
      </div> */}
>>>>>>> 376e98e24b0ca2dad42dc0dacc9e5c7ed337c75f
    </ReceiptMakingContainer>
  );
};

export default ReceiptMaking;
