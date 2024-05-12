const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/siris-blogg', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const Comment = require('./models/CommentModel');

const bannedWords = ['banan', 'äpple', 'test'];

const containsBannedWords = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => bannedWords.includes(word));
};

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (containsBannedWords(content)) {
      return res.status(400).json({ error: 'Content contains banned words' });
    }
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;
    if (containsBannedWords(content)) {
      return res.status(400).json({ error: 'Content contains banned words' });
    }
    const comment = new Comment({ content, postId });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate JWT token with a 5-minute expiration time
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '5m' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});


app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await Post.deleteOne({ _id: postId });
    if (result.deletedCount === 0) {
      console.log(`Post with ID ${postId} not found`);
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log(`Post with ID ${postId} deleted successfully`);
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: 'Failed to delete post', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});