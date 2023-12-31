import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentIndex, slides.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img src={slide.image} alt={`slide-${index}`} className="slide-image" />
            <div className="carousel-info">
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
      <div className="carousel-buttons">
        <Link to="/create-account">
          <button className="carousel-button primary" onClick={() => console.log("Create Account")}>
            Create Account
          </button>
        </Link>
        <Link to="/sign-in">
          <button className="carousel-button secondary" onClick={() => console.log('Sign In')}>
            Already have an account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Carousel;
