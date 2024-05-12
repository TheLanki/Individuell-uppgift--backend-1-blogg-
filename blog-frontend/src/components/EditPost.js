import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${postId}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/posts/${postId}`, { title, content });
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form className="edit-post-form" onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleTitleChange} />
        <textarea value={content} onChange={handleContentChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
