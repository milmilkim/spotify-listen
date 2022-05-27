import React, { memo } from 'react';
import { Modal } from 'antd';

const SearchModal = memo(({ visible, setVisible, params, setParams, type }) => {
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
});

export default SearchModal;
