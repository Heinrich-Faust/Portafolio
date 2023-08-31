import React, { useState, useEffect } from 'react';
import './App.css';
import CenterImage from './center-image.png';
import CenterImage1 from './info-image.png';
import Gif from './gif.gif';
import UserWayWidget from './UserWayWidget';

function App() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(40 * 30) }, (_, index) => ({
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

  const handleMove = (x, y) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) => {
        const speedFactor = 1;
        const dx = shape.x - x;
        const dy = shape.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceFactor = 2000 / (distance * distance);

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
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    handleMove(clientX, clientY);
  };

  const handleTouchMove = (event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      <UserWayWidget />
      <img src={CenterImage1} alt="fondo5" className="fondo5" />
      <img src={CenterImage1} alt="fondo4" className="fondo4" />
      <img src={CenterImage1} alt="fondo6" className="fondo6" />
      <img src={CenterImage} alt="top Center" className="center-image" />
    <div>
      <img src={Gif} alt="GIF" className="gif" />
    </div>
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
    </div>
  );
}

export default App;
