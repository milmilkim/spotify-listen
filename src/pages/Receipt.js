import React, { Fragment } from "react";

import ReceiptMaking from "../components/ReceiptMaking";
import ReceiptLogin from "../components/ReceiptLogin";

const Receipt = () => {
  return (
    <div>
      <ReceiptLogin />
      <ReceiptMaking />
    </div>
  );
};

export default Receipt;
