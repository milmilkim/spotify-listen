import Router from './router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from './slices/TokenSlice';

import './App.css';
function App() {
  const { token, isLoading } = useSelector((state) => state.token);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>{token}</h1>
      <Router />
    </div>
  );
}

export default App;
