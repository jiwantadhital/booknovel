import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import "./Extra.css";

const Page = React.forwardRef((props, ref) => {
    return (
      <div className="demoPage" ref={ref}> 
        <h1>Page Header</h1>
        <p>{props.children}</p>
        <p>Page number: {props.number}</p>
      </div>
    );
  });
  
  function MyBook(props) {
    return (
      <HTMLFlipBook 
      width={550}
      height={733}
      size="stretch"
      minWidth={315}
      maxWidth={1000}
      minHeight={400}
      maxHeight={1533}
      maxShadowOpacity={0.5}
      showCover={true}
      mobileScrollSupport={true}
      className="demo-book"
      >
        <Page number="1">Page text</Page>
        <Page number="2">Page text</Page>
        <Page number="3">Page text</Page>
        <Page number="4">Page text</Page>
      </HTMLFlipBook>
    );
  }

  export default MyBook;