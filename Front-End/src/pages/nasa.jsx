import React, { useEffect } from "react";
import { useState } from "react";

function nasa() {
  const [nasaImage, setNasaImage] = useState(null);
  const [nasaTitle, setNasaTitle] = useState(null);
  const [nasaExplanation, setNasaExplanation] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function getNasaImageOfTheDay() {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const url = "http://localhost:3000/nasa-image-of-the-day";

    setIsLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setNasaImage(data.url);
        setNasaTitle(data.title);
        setNasaExplanation(data.explanation);
      });
  }

  useEffect(() => {
    getNasaImageOfTheDay();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          <h1>NASA Image of the Day</h1>
          <h2>{nasaTitle}</h2>
          {/* <p>{nasaExplanation}</p> */}
          <img width="100%" src={nasaImage} alt={nasaTitle} />
        </div>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <div className="grid">
          <h3>You can't see the image. You have to sign in to see it</h3>

          <a
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
            href="/login"
          >
            Sign In
          </a>
        </div>
      )}
    </div>
  );
}

export default nasa;
