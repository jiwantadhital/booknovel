import { useState } from 'react';
import "./Comment.css";

function SingleComment(props) {
    // const like = props.comment.likes;
    const likes = parseInt(props.likes);
    const filledStars = Math.floor(likes);
    const emptyStars = 5 - filledStars;
   
     // create an array of filled and empty stars based on the number of likes
  const stars = Array.from({ length: filledStars }, (_, index) => <i key={index} className="fas fa-star"></i>);
  const emptyStarsArray = Array.from({ length: emptyStars }, (_, index) => <i key={index} className="far fa-star"></i>);

  return (
    <div>
          <span className="comment-rating">
        <p class="py-2">
          {stars}
          {emptyStarsArray}
            <span class="list-inline-item text-dark">{props.likes}/5</span>
          
        </p></span>
    </div>
  )
}

export default SingleComment