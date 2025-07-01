// components/Post.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { post_id } = useParams();
  return <h2>Post #{post_id}</h2>;
};

export default Post;
