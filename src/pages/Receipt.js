import React, { Fragment } from 'react';

import ReceiptMaking from '../components/ReceiptMaking';

import { getTop } from '../slices/Top';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Receipt = () => {
  const hash = new URL(window.location.href).hash.split('&')[0];
  const token = hash.split('=')[1];

  const { data } = useSelector((state) => state.top);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTop({
        token, //token:token
        time_range: 'long_term',
      })
    );
  }, [dispatch, token]);

  return (
    <div>
      {token}
      <ReceiptMaking />
      {data && <>{JSON.stringify(data)}</>}
    </div>
  );
};

export default Receipt;
