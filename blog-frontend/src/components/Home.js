import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.css'; 

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Blog</h1>
      <p>Check out the latest posts:</p>
      <Link to="/posts" className={styles.button}>View Posts</Link>
      <p>Already have an account? <Link to="/login" className={styles.button}>Login</Link></p>
      <p>Don't have an account yet? <Link to="/register" className={styles.button}>Register</Link></p>
    </div>
  );
};

export default Home;
