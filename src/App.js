import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Route as RouteV6 } from 'react-router-dom';
import './App.css';
import bubbleImage from './bubble-image.png';
import topLeftImage from './top-left-image.jpeg';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

function App() {
  const [shapes, setShapes] = useState([]);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);
  const [infoText, setInfoText] = useState('JUAN AMAYA DEVELOPER');

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(30 * 10) }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50 + 20,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      shape: 'circle',
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
    }));
    setShapes(initialShapes);
  }, []);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setShapes((prevShapes) =>
      prevShapes.map((shape) => {
        const speedFactor = 0.075;
        const dx = shape.x - clientX;
        const dy = shape.y - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceFactor = 100 / (distance * distance);

        let newShape = {
          ...shape,
          x: shape.x + shape.speedX * speedFactor + dx * forceFactor,
          y: shape.y + shape.speedY * speedFactor + dy * forceFactor,
        };

        if (newShape.x < 0 || newShape.x > window.innerWidth) {
          newShape.speedX *= -1;
        }
        if (newShape.y < 0 || newShape.y > window.innerHeight) {
          newShape.speedY *= -1;
        }

        return newShape;
      })
    );

    setBubbleX(clientX);
    setBubbleY(clientY);
  };

  return (
    <Router>
      <div className="App" onMouseMove={handleMouseMove}>
        <img src={topLeftImage} alt="Top Left" className="top-left-image" />

        <div className="shapes-container">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={`shape ${shape.shape}`}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                boxShadow: `0px 0px 20px ${shape.color}`,
              }}
            />
          ))}
        </div>

        <div className="bubble-container">
          <div
            className="bubble"
            style={{
              left: bubbleX,
              top: bubbleY,
            }}
          >
            <img src={bubbleImage} alt="Burbuja" className="bubble-image" />
          </div>
          <div className="link-list">
            <a href="./ProjectsPage" className="link-button" target="_blank" rel="noopener noreferrer">
              PROJECTS
            </a>
            <a href="./AboutPage" className="link-button" target="_blank" rel="noopener noreferrer">
              ABOUT ME
            </a>
            <a href="./ContactPage" className="link-button" target="_blank" rel="noopener noreferrer">
              CONTACT
            </a>
          </div>
        </div>

        <Routes>
          <RouteV6 path="./ProjectsPage" element={<ProjectsPage />} />
          <RouteV6 path="./AboutPage" element={<AboutPage />} />
          <RouteV6 path="./ContactPage" element={<ContactPage />} />
        </Routes>

        <div className="info-text">{infoText}</div>
      </div>
    </Router>
  );
}

export default App;
