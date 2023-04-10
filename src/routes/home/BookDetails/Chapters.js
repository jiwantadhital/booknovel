import React, { useState } from 'react';
import './Chapter.css';
function Chapters(props) {
    const [hoveredChapter, setHoveredChapter] = useState(null);

    const handleHover = (index) => {
      setHoveredChapter(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredChapter(null);
    };
  return (
    <div>
           <div className="chapter-list">
      {props.product.chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className={`chapter-item ${
            hoveredChapter === index ? 'chapter-hovered' : ''
          }`}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="chapter-number">{chapter.number}</div>
          <div className="chapter-name">{chapter.name}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Chapters