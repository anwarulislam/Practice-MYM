import React from "react";
import { useState } from "react";

function nasa() {
  const [nasaImage, setNasaImage] = useState(null);
  const [nasaTitle, setNasaTitle] = useState(null);
  const [nasaExplanation, setNasaExplanation] = useState(null);

  function getNasaImageOfTheDay() {
    const url = "http://localhost:5000/nasa-image-of-the-day";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNasaImage(data.url);
        setNasaTitle(data.title);
        setNasaExplanation(data.explanation);
      });
  }

  getNasaImageOfTheDay();

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>NASA Image of the Day</h1>
      <img src={nasaImage} alt={nasaTitle} />
      <h2>{nasaTitle}</h2>
      <p>{nasaExplanation}</p>
    </div>
  );
}

export default nasa;
