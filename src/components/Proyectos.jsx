import React, { useState, useEffect } from 'react';
import './App.css';
import './tabcontent.css';
import bubbleImage from './bubble-image.png';

function TabContent({ projectName }) {
  return (
    <div className="tab-content">
      <h2>{projectName}</h2>
      {/* Agrega aquí la información específica del proyecto */}
    </div>
  );
}

function App() {
  const [shapes, setShapes] = useState([]);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);
  const [activeTab, setActiveTab] = useState('proyecto1');

  useEffect(() => {
    const initialShapes = Array.from({ length: Math.ceil(30 * 30) }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 50 + 20,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      shape: 'circle2',
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
        const forceFactor = 150 / (distance * distance);

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

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'proyecto1' ? 'active' : ''}`}
          onClick={() => handleTabChange('proyecto1')}
        >
          Proyecto 1
        </button>
        <button
          className={`tab-button ${activeTab === 'proyecto2' ? 'active' : ''}`}
          onClick={() => handleTabChange('proyecto2')}
        >
          Proyecto 2
        </button>
        <button
          className={`tab-button ${activeTab === 'proyecto3' ? 'active' : ''}`}
          onClick={() => handleTabChange('proyecto3')}
        >
          Proyecto 3
        </button>
        <button
          className={`tab-button ${activeTab === 'proyecto4' ? 'active' : ''}`}
          onClick={() => handleTabChange('proyecto4')}
        >
          Proyecto 4
        </button>
      </div>

      {activeTab === 'proyecto1' && <TabContent projectName="Proyecto 1" />}
      {activeTab === 'proyecto2' && <TabContent projectName="Proyecto 2" />}
      {activeTab === 'proyecto3' && <TabContent projectName="Proyecto 3" />}
      {activeTab === 'proyecto4' && <TabContent projectName="Proyecto 4" />}
          </div>
  );
}

export default App;
