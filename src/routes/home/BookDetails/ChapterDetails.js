import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useLocation } from 'react-router-dom';

import "../../Extra.css"

function ChapterDetails(props) {
    const location = useLocation();
    const chapter = location.state.chapterss;
    const theId = location.state.index;
    const [currentChapter, setCurrentChapter] = useState(theId??0);
    const [chapterData, setChapterData] = useState([]);
    const chapters = chapter[currentChapter];

    const handleNextChapter = () => {
        if(currentChapter==chapter.length-1){
            
        }
        else{
        setCurrentChapter(currentChapter + 1);
    }
      };
      const handlePreviousChapter = () => {
        if(currentChapter==0){

        }
        else{
        setCurrentChapter(currentChapter - 1);
    }
      };
    useEffect(() => {
      fetch(`http://localhost:8000/api/partChapter/${localStorage.getItem('chaptyerId')}`)
        .then(response => response.json())
        .then(data => setChapterData(data))
        .catch(error => console.log(error));
    }, [chapters,currentChapter,chapterData,]);
  
  return (
    <div id="all">
<div id="wrapper">
    <div id="container">

        <section class="open-book">
            <header>
            <h1>The Brave</h1>
             
                <h6>Erin E. Sullivan</h6>
               
            </header>
            <article>
                <div>
                <h2 class="chapter-title">
                    {chapters.name}
                  </h2>
                <p>
              {chapters.description}
                </p>
                </div>
            </article>
            <footer>
                <ol id="page-numbers">
                    <li style={{ cursor: 'pointer' }} onClick={()=>{
                handlePreviousChapter();
            }}>Previous Page</li>
                    <li style={{ cursor: 'pointer' }}  onClick={()=>{
                handleNextChapter();
            }}>Next Page</li>
                   
                </ol>
            </footer>
        </section>

    </div>
</div>
    </div>
  )
}

export default ChapterDetails
