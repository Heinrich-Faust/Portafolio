import React from 'react';
import bubbleImage from './bubble-image.png';

function BubbleContainer({ bubbleX, bubbleY }) {
  return (
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
  );
}

export default BubbleContainer;
