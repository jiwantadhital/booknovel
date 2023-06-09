import { useState } from 'react';
import SingleComment from './SingleComment';
import "./Comment.css";
import { FaStar } from 'react-icons/fa';


function Comments(props) {
    const comments = props.product.comments;
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const handleRatingChange = (event) => {
        setRating(event.target.value);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = {"product_id":props.product.id, "likes": rating,"comments": description };
        fetch('http://localhost:8000/api/user-comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to post comment');
            }
            // reset the form fields
            setRating('');
            setDescription('');
            setShowForm(false);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    
      
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
    
  return (
    <div>
          <button className='btn1' onClick={() => setShowForm(true)}>Add Comments</button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="1" max="5" value={rating} onChange={handleRatingChange} />
            <br />
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={description} onChange={handleDescriptionChange}></textarea>
            <br />
            <button className='btn2' type="submit" >Submit</button>
          </form>
        )}
       <div className='formar'>
       {comments.map((comment) => (
      <div className="comment-container">
      <div className="avatar-container">
        <img className="avatar" src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt={comment.name} />
      </div>
      <div className="comment-info">
        <div className="name-container">
          <h5 className="name">Jhon Doe</h5>
          <div className="rating-container">
          <SingleComment likes={comment.likes}/>
          </div>
        </div>
        <p className="description">{comment.comments}</p>
      </div>
    </div>
          ))}
       </div>

  </div>
  )
}

export default Comments