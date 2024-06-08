import axios from "axios";
import { useEffect, useState } from "react";

import Login from "../components/Login";

function Main() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<any>({});

  const logout = () => {
    axios({
      url: "http://localhost:3001/api/v1/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:3001/api/v1/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        {isLogin ? (
          <>
            <h3>{user.username} 님이 로그인했습니다.</h3>
            <button onClick={logout} className="loginButton">
              Logout
            </button>
          </>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );
}

export default Main;