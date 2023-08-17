import React, { useState, useEffect } from 'react';
import './App.css';
import bubbleImage from './bubble-image.png';
import topLeftImage from './top-left-image.jpeg';

function App() {
  // State variables for managing shapes, bubble coordinates, and info text
  const [shapes, setShapes] = useState([]); // Array to store shape properties
  const [bubbleX, setBubbleX] = useState(0); // X-coordinate of the bubble
  const [bubbleY, setBubbleY] = useState(0); // Y-coordinate of the bubble
  const [infoText, setInfoText] = useState('JUAN AMAYA FRONT END DEVELOPER'); // Text to display

  useEffect(() => {
    // Initialize shapes with random properties when component mounts
    const initialShapes = Array.from({ length: Math.ceil(30 * 30) }, (_, index) => ({
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

  // Event handler for mouse movement
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    // Update shape positions based on mouse movement
    setShapes((prevShapes) =>
      prevShapes.map((shape) => {
        const speedFactor = 0.095;
        const dx = shape.x - clientX;
        const dy = shape.y - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceFactor = 200 / (distance * distance);

        // Calculate new shape position with added forces
        let newShape = {
          ...shape,
          x: shape.x + shape.speedX * speedFactor + dx * forceFactor,
          y: shape.y + shape.speedY * speedFactor + dy * forceFactor,
        };

        // Reflect shapes that go out of bounds
        if (newShape.x < 0 || newShape.x > window.innerWidth) {
          newShape.speedX *= -1;
        }
        if (newShape.y < 0 || newShape.y > window.innerHeight) {
          newShape.speedY *= -1;
        }

        return newShape;
      })
    );

    // Update bubble coordinates based on mouse position
    setBubbleX(clientX);
    setBubbleY(clientY);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {/* Top left image */}
      <img src={topLeftImage} alt="Top Left" className="top-left-image" />

      {/* Container for shapes */}
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

      {/* Container for the bubble */}
      <div className="bubble-container">
        <div
          className="bubble"
          style={{
            left: bubbleX,
            top: bubbleY,
          }}
        >
          <img src={bubbleImage} alt="Bubble" className="bubble-image" />
        </div>
      </div>

      {/* Display info text */}
      <div className="info-text">{infoText}</div>
    </div>
  );
}

export default App;
