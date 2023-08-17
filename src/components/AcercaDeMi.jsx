import React, { useState, useEffect } from 'react';
import './App.css';
import bubbleImage from './bubble-image.png';

function App() {
  const [shapes, setShapes] = useState([]);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(30 * 30) }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50 + 20,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      shape: 'circle1',
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
        const forceFactor = 200 / (distance * distance);

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
    <div className="App" onMouseMove={handleMouseMove}>

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
      </div>

    </div>
  );
}

export default App;
