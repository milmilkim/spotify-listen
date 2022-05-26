import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin, setToken } from '../slices/TokenSlice';

function Receipt() {
  const hash = new URL(window.location.href).hash.split('&')[0];
  const token = hash.split('=')[1];
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

  return (
    <div>
      <h1>receipt</h1>

      {isLogin ? <>로그인 완료 ^^~~!</> : <>로그인 실패했으니 다시 시도하세요~~!</>}
    </div>
  );
}

export default Receipt;
