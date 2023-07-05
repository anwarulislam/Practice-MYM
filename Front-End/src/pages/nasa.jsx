import React from "react";
import { useState } from "react";

function nasa() {
  const [nasaImage, setNasaImage] = useState(null);
  const [nasaTitle, setNasaTitle] = useState(null);
  const [nasaExplanation, setNasaExplanation] = useState(null);

  const NASA_API_KEY = "joS4ocJX2mpkCJHpGk0PLwBX9T0daTTQVKdpI9Mf";

  function getNasaImageOfTheDay() {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

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
