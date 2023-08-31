import React, { useState, useEffect } from 'react';
import './App.css';
import './Acercademi.css';
import CenterImage from './bubble-image.png';
import CenterImage1 from './info-image.png';
import Gif from './gif.gif';
import MunecoIzquierdo from './muneco.png';
import MunecoDerecho from './muneco.png';

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
        const forceFactor = 1200 / (distance * distance);

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
      <img src={MunecoIzquierdo} alt="Muñequito izquierdo" className="muneco-izquierdo" />
      <div className="text-box">
      <div className="scrollable-content">
      <p>
      ¡Saludos! Soy ese tipo con el cabello largo y crespo que a veces confunden con un hacker de película. Pero no, no tengo gafas geniales ni un cuartel general secreto, solo mi computadora y un amor inquebrantable por escribir líneas de código que cobran vida.

      ¿Front-end? ¡Claro, suena como si estuviera hablando de una especie en peligro de extinción! Pero no se preocupen, aquí estoy, el "novato" valiente y curioso que está dando sus primeros pasos en el mundo de la programación. A veces me siento como un mago digital, haciendo que los botones cambien de color y las imágenes bailen al ritmo de mi melodía de HTML y CSS. Aunque, admito que mis primeros intentos podrían haber sido confundidos con una mezcla caótica de confeti en una tormenta de nieve.

      Pero, ¿saben qué dicen? Que los errores son solo oportunidades para aprender, ¡y créanme, he aprendido tanto que podría llenar un servidor! Mi enfoque es más proactivo que un gato persiguiendo un láser. Siempre estoy ansioso por aprender más, mejorar mis habilidades y sumergirme en los desafíos que el código me lanza, incluso si a veces me hacen arrancarme esos cabellos crespos.

      Ah, pero no piensen que mi vida es solo un montón de líneas de código y píxeles rebeldes. Cuando mi computadora me da un respiro, me lanzo a la lectura como si fuera un portal a otros mundos. Las palabras son mis aliadas tanto en la pantalla como entre las páginas de un buen libro. Y para equilibrar todas esas horas sedentarias, canalizo mi energía aprendiendo artes marciales. No les mentiré, en mi mente, a veces imagino que estoy defendiendo mi código de los bugs con una serie de patadas bien ejecutadas.

      Sé que suena como si estuviera viviendo en un mundo de bits y bytes, pero mi realidad es más colorida que la paleta de un diseñador. Soy un amante de las posibilidades, un tejedor de sueños digitales y un luchador contra los errores del código. Así que, si alguna vez se cruzan con alguien que se parece a un cruce entre un desarrollador y un ninja, ¡eso probablemente sea yo!

      En resumen, soy un chico con cabello largo, pasión por el código, amor por las palabras, devoción por las artes marciales y un inquebrantable deseo de mejorar. Así que aquí estoy, balanceando entre la elegancia del diseño y la lucha contra los problemas técnicos, creando un mundo donde la poesía del código se mezcla con la destreza física de las artes marciales. ¡Gracias! ¡Que el código esté siempre a su favor y las patadas nunca falten a su objetivo!

      </p>
    </div>
  </div>
  <img src={MunecoDerecho} alt="Muñequito derecho" className="muneco-derecho" />
</div>
  );
}

export default App;
