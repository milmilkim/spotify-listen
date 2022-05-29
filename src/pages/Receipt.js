import React, { Fragment } from 'react';

import ReceiptMaking from '../components/ReceiptMaking';

const Receipt = () => {
  const hash = new URL(window.location.href).hash.split('&')[0];
  const token = hash.split('=')[1];

  return (
    <div>
      {token}
      <ReceiptMaking />
    </div>
  );
};

export default Receipt;
