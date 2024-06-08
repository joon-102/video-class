import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios({
      url: "http://localhost:3001/api/v1/login",
      method: "POST",
      withCredentials: true,
      data: {
        username: username,
        password: password,
      },
    }).then((result) => {
      if (result.status === 200) {
        window.open('/', '_self')
      }
    });
  };

  return (
    <div>
      <div className="loginContainer">
        <div className="inputGroup">
          <label className="inputLabel">username</label>
          <input
            type="username"
            placeholder="username"
            className="inputValue"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel">password</label>
          <input
            type="password"
            placeholder="password"
            className="inputValue"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={login} className="loginButton">Login</button>
      </div>
    </div>
  );
}