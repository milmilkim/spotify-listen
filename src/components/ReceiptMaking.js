import React from "react";
import styled from "styled-components";

const ReceiptMakingContainer = styled.div`
  padding: 10px;
`;

const ReceiptMaking = () => {
  return (
    <ReceiptMakingContainer>
      <div className="receipt">
        <h2>들어보세요</h2>
        <h3>{timeRanges}</h3>
        <p>ORDER #000{btnValue}</p>
        <p>{date}</p>
      </div>
    </ReceiptMakingContainer>
  );
};

export default ReceiptMaking;
