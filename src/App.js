import Router from './router';
import { useEffect, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from './slices/TokenSlice';

import './App.css';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);
  //실행되면 토큰먼저 발급 ~_~

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default memo(App);
