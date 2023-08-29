import React, { useState, useEffect } from 'react';
import './App.css';
import bubbleImage from './bubble-image.png';
import CenterImage from './bubble-image.png';
import CenterImage1 from './info-image.png';
import Github from './github-icon-1.png';
import Whatsapp from './whatsapp.png';
import Facebook from './Facebook.png';
import Instagram from './Instagram.png';
import Linkedin from './Linkedin.png';

function App() {
  const [shapes, setShapes] = useState([]);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(40 * 30) }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50 + 20,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      shape: 'circle3',
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
        const forceFactor = 250 / (distance * distance);

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
      <img src={CenterImage} alt="fondo" className="fondo" />
      <img src={CenterImage1} alt="fondo1" className="fondo1" />
      <img src={CenterImage1} alt="fondo2" className="fondo2" />

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

      <div className="social-icons">
        <a href="Enlace de WhatsApp">
          <img src={Whatsapp} alt="WhatsApp" className="social-icon" />
        </a>
        <a href="Enlace de Facebook">
          <img src={Facebook} alt="Facebook" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/juan-pablo-amaya-perez-00260824a">
          <img src={Linkedin} alt="LinkedIn" className="social-icon" />
        </a>
        <a href="Enlace de Instagram">
          <img src={Instagram} alt="Instagram" className="social-icon" />
        </a>
        <a href="https://github.com/Heinrich-Faust">
          <img src={Github} alt="github" className="social-icon" />
        </a>
      </div>
    </div>
  );
}

export default App;
