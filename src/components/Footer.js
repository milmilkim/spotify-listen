import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  hr {
    width: 10px;
  }
  .inner {
    text-align: center;

    .logo {
      display: block;
      width: 50px;
      height: 50px;
      background-color: #ccc;
      border-radius: 50%;
    }

    .flex-row {
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="inner">
        <hr />
        <div className="flex-row">
          <div>
            <a href="#" className="logo">
              <span className="blind-text">repository</span>
            </a>
          </div>
          <div>
            <p>버그 신고 및 기타 문의 misoriu@gmail.com</p>
            <p>본 사이트는 영리목적 없이 개인 프로젝트의 일환으로 제작되었습니다.</p>
          </div>
          <div>
            <a href="#" className="logo">
              <span className="blind-text">repository</span>
            </a>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
