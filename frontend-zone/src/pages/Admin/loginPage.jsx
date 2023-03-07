import axios from "axios";
import { useState } from "react";
import apiConfig from "../../api/apiConfig";
import bg from "../../assets/footer-bg.jpg";
import { BeatLoader } from "react-spinners";
import "./loginPage.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  // Create the submit method.
  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = {
      username: username,
      password: password,
    };
    axios
      .post(apiConfig.baseUrl + "token/", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((data) => {
        console.log(data.data.access);
        localStorage.clear();
        localStorage.setItem("access_token", data.data.access);
        localStorage.setItem("refresh_token", data.data.refresh);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data["access"]}`;
        window.location.href = "/basecamp/menu";
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setLoginError(true);
      });
  };

  return (
    <>
    
      <div className="banner" style={{ backgroundImage: `url(${bg})` }}></div>
        <div className="Auth-form-container" style={{ textAlign: "center" }}>
          <form className="Auth-form" onSubmit={submit}>
            <div className="Auth-form-content">
              <br/>
              <h3 className="cyberpunk-label">Sign In</h3>
              <div className="form-group mt-3" style={{ margin: "10px" }}>
                <label className="cyberpunk-label" style={{ margin: "10px" }}>Username</label>
                <input
                  className="form-control mt-1"
                  placeholder="Enter Username"
                  name="username"
                  type="text"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mt-3" style={{ margin: "10px" }}>
                <label className="cyberpunk-label" style={{ margin: "10px" }}>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3" style={{ margin: "10px", marginTop:"30px" }}>
                <button class="cyberpunk-btn" type="submit">Masuk</button>
                {/* <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginLeft: "30px" ,backgroundColor: "#1aff1a",boxShadow:" 0px 0px 7px 8px rgb(37 61 252 / 30%)"}}
                >
                  Masuk
                </button> */}
              </div>
              <br />
              {isLoading && <BeatLoader color="white" size={10} className="loader" />}
              {loginError?<h3>Astagfirullahadzim, Anda Siapa ?,<br/> Coba Lagi Dong, Cuakszzz </h3> : null}
              <br />
              <br />
              <br />
            </div>
          </form>
        </div>
    </>
  );
};

export default LoginPage;
