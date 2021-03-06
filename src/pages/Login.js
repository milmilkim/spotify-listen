import { Button } from 'antd';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_url = process.env.REACT_APP_REDIRECT_URL;
const scope = 'user-read-private user-read-email user-top-read';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_url);

function Login() {
  return (
    <>
      <a href={url}>
        <Button type="primary">스포티파이로 로그인</Button>
      </a>
    </>
  );
}

export default Login;
