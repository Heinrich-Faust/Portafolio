import React from 'react';

function ShapesContainer({ shapes }) {
  return (
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
  );
}

export default ShapesContainer;
