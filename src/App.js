import React, { useState, useEffect } from 'react';
import './App.css';
import bubbleImage from './bubble-image.png';
import cornerGif from './corner-gif.gif'; // Importa la URL de tu GIF aquí

function App() {
  const [shapes, setShapes] = useState([]);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);
  const [infoText, setInfoText] = useState('JUAN AMAYA DEVELOPER');

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(17 * 5) }, (_, index) => ({
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

        let newShape = {
          ...shape,
          x: shape.x + shape.speedX * speedFactor,
          y: shape.y + shape.speedY * speedFactor,
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

  const handleLinkClick = (link) => {
    if (link === 'Enlace 1') {
      setInfoText('Información del Enlace 1');
    } else if (link === 'Enlace 2') {
      setInfoText('Información del Enlace 2');
    } else if (link === 'Enlace 3') {
      setInfoText('Información del Enlace 3');
    }
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <img src={cornerGif} alt="GIF" className="corner-gif" />

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
          <div className="link-item" onClick={() => handleLinkClick('Enlace 1')}>
            Enlace 1
          </div>
          <div className="link-item" onClick={() => handleLinkClick('Enlace 2')}>
            Enlace 2
          </div>
          <div className="link-item" onClick={() => handleLinkClick('Enlace 3')}>
            Enlace 3
          </div>
        </div>
      </div>

      <div className="info-text">{infoText}</div>
    </div>
  );
}

export default App;

