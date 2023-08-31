import React, { useState, useEffect } from 'react';
import './App.css';
import topLeftImage from './top-left-image.png';
import CenterImage from './center-image.png';
import bottomimage from './bottom-image.png';
import Center from './center.png';
import CenterImage1 from './info-image.png';

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

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    setShapes((prevShapes) =>
      prevShapes.map((shape) => {
        const speedFactor = 1;
        const dx = shape.x - clientX;
        const dy = shape.y - clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceFactor = 300 / (distance * distance);

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

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <img src={CenterImage1} alt="fondo3" className="fondo3" />
      <img src={CenterImage1} alt="fondo2" className="fondo2" />
      <img src={topLeftImage} alt="Top Left" className="top-left-image" />
      <img src={bottomimage} alt="bottom" className="bottom-image" />
      <img src={CenterImage} alt="top Center" className="center-image" />
      <img src={Center} alt="Center" className="center" />


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
