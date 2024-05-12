import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const CreatePost = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/posts',
        { title, content }
      );
      onPostCreated(response.data);
      setTitle('');
      setContent('');
      setError('');
      setSuccessMessage('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Post contains banned words. Please try again.') {
        setError('Post contains banned words. Please try again.');
      } else {
        setError('Failed to create post. Please try again.');
      }
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
