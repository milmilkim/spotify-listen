import Router from './components/Router';
import { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from './slices/TokenSlice';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

import './App.less';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(REACT_APP_CLIENT_ID);
    dispatch(getToken());
  }, [dispatch]);
  //실행되면 토큰먼저 발급 ~_~

  return (
    <div className="App">
      <Header />
      <Content>
        <Router />
      </Content>
      <Footer />
    </div>
  );
}

export default memo(App);
