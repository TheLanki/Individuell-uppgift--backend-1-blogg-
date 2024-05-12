import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';
import '../App.css'; 

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);


  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostEdit = async (postId, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedData);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handlePostDelete = (deletedPostId) => {
    setPosts(posts.filter(post => post._id !== deletedPostId));
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      <button className="create-button" onClick={toggleCreateForm}>Create New Post</button>
      {showCreateForm && <CreatePost onPostCreated={handlePostCreated} />}
      <div className="posts">
        {posts.map(post => (
          <Post 
            key={post._id} 
            post={post} 
            onEdit={handlePostEdit} 
            onDelete={handlePostDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
