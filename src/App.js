import Router from './router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

export default App;
