import React, { useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import '../App.css';

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(post.comments || []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await onEdit(post._id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${post._id}`);
      onDelete(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{editedTitle}</h2>
          <p>{editedContent}</p>
          <div className="post-buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={toggleCommentForm} className="comment-button">Comment</button>
          </div>
          {showCommentForm && (
            <div>
              <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />
            </div>
          )}
          <div className="comments-container">
            <h3>Comments</h3>
            {comments.map(comment => (
              <div className="comment" key={comment._id}>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
