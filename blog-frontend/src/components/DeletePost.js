import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  return (
    <div>
      <h2>Delete Post</h2>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
