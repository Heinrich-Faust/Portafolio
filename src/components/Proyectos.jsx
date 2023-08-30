import React, { useState, useEffect } from 'react';
import './App.css';
import './tabcontent.css';
import bubbleImage from './bubble-image.png';
import Github from './github-icon.png';
import AmayaImage1 from './Amaya-in-da-jaus-1.png';
import AmayaImage2 from './Amaya-in-da-jaus-2.png';
import CenterImage1 from './info-image.png';


function TabContent({ projectName, image1, image2, text, githubLink }) {
  return (
    <div className="tab-content">
      <div className="images-container">
        <img src={image1} alt="Imagen 1" />
        <img src={image2} alt="Imagen 2" />
      </div>
      <div className="text-container">
        <p>{text}</p>
      </div>
      <div className="github-button">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <img src={Github} alt="github" className="github-logo" />
        </a>
      </div>
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
        const speedFactor = 1;
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

  const tabContentData = [
    {
      tabName: 'proyecto1',
      projectName: 'Amaya In Da House',
      image1: AmayaImage1,
      image2: AmayaImage2,
      text: 'Pagina creada completamente en Html y Css, es un blog de moda masculina, con varias entradas y musica que genera un ambiente deluxe, entorno a la moda.',
      githubLink: 'https://github.com/Heinrich-Faust/Amaya-In-Da-House',
    },
    
  ];

  const activeTabData = tabContentData.find((tabData) => tabData.tabName === activeTab);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
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

      <div className="tabs-container">
        {tabContentData.map((tabData) => (
          <button
            key={tabData.tabName}
            className={`tab-button ${activeTab === tabData.tabName ? 'active' : ''}`}
            onClick={() => handleTabChange(tabData.tabName)}
          >
            {tabData.projectName}
          </button>
        ))}
      </div>

      {activeTabData && (
        <TabContent
          projectName={activeTabData.projectName}
          image1={activeTabData.image1}
          image2={activeTabData.image2}
          text={activeTabData.text}
          githubLink={activeTabData.githubLink}
        />
      )}
    </div>
  );
}

export default App;
