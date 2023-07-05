import React from "react";
import { useState } from "react";
function login({ setUser }) {
  const [username, setUsername] = useState("jack");
  const [password, setPassword] = useState("jill");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username,
      password,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <input
              defaultValue={username}
              type="text"
              placeholder="Username"
              onKeyUp={(e) => setUsername(e.target.value)}
            />
            <input
              defaultValue={password}
              type="password"
              placeholder="Password"
              onKeyUp={(e) => setPassword(e.target.value)}
            />
            <div className="buttons">
              <button className="register-button">Register</button>
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
