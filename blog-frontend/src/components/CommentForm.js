import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
        content: comment
      });
      onCommentAdded(response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-form-container">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentForm;
