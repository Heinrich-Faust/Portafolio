import React, { useState, useEffect } from 'react';
import './App.css';
import CenterImage from './bubble-image.png';
import CenterImage1 from './info-image.png';
import Github from './github-icon-1.png';
import Whatsapp from './whatsapp.png';
import Facebook from './Facebook.png';
import Instagram from './Instagram.png';
import Linkedin from './Linkedin.png';
import Gif from './gif.gif';

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
      <img src={CenterImage} alt="fondo" className="fondo" />
      <img src={CenterImage1} alt="fondo1" className="fondo1" />
      <img src={CenterImage1} alt="fondo2" className="fondo2" />
      <div>
      <img src={Gif} alt="GIF" className="gif1" />
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
            
      <div className="social-icons">
        <a href="https://wa.me/573209676856">
          <img src={Whatsapp} alt="WhatsApp" className="social-icon" />
        </a>
        <a href="https://www.facebook.com/juanpablo.amayaperez/">
          <img src={Facebook} alt="Facebook" className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/juan-pablo-amaya-perez-00260824a">
          <img src={Linkedin} alt="LinkedIn" className="social-icon" />
        </a>
        <a href="https://www.instagram.com/amaya_juanp/">
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
