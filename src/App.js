import Router from './router';
import { Link } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <h1>bye world</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">메인</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/recommendation">추천</Link>
          </li>
        </ul>
      </nav>
      <Router />
    </div>
  );
}

export default App;
