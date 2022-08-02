# 들어보세요
Spotify Open Api와 연동해서 음원 정보를 검색/조회하고 자주 재생한 곡을 기간별로 확인할 수 있는 서비스입니다.

## 시작하기
프로젝트 root에 `.env`파일을 생성합시다
```
REACT_APP_CLIENT_ID = 스포티파이 API에서 발급받은 client id
REACT_APP_CLIENT_SECRET = 스포티파이 API에서 발급받은 client secret
REACT_APP_REDIRECT_URL = 예: http://localhost:3000/receipt
```

## Stack

### Front-End

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

React.js로 개발하였으며 Redux로 상태 관리를 합니다. Styled-components로 스타일링을 하고 ui는 ant design을 사용했습니다.

### Deploy

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

netlify로 배포되었습니다.
