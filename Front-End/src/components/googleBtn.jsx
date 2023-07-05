import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function googleBtn({ setToken }) {
  const responseGoogle = (response) => {
    // Send the Google ID token to your backend for verification and JWT token generation
    const token = response.credential;

    console.log(response);

    // Make a POST request to your backend route for Google authentication
    fetch("http://localhost:3000/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { token } = data;
        console.log("Success:", data);

        // Store the JWT token in localStorage
        setToken(token);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div
      style={{
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <GoogleLogin
        clientId="461349021297-u2s7gd7nie5697m0d4po36687fp0n6du.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default googleBtn;
