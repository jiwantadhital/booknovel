import React, { useState } from 'react';
import { BrowserRouter, Route, Link,useNavigate } from "react-router-dom";


import './Chapter.css';
function Chapters(props) {
  const navigate = useNavigate();
  const chapterss = props.product.chapters;

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
          onMouseLeave={handleMouseLeave} onClick={()=>{
            localStorage.setItem('chaptyerId', (props.product.id));
            navigate('/chapterDetails',{state:{chapterss, index}});
          }}
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