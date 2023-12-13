import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link from your routing library

export function PostCard ({ post }){
  return (
    <div className="container-fluid">
      <div className="post-card" key={post._id}>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <img
              src={post.imagelink}
              alt={post.title}
              className="post-card-img"
            />
          </div>
          <div className="col-md-9 text-center">
            <h3>{post.title}</h3>
            <p className="post-content">{post.description}</p>

            <div className="post-meta">
              <p className="fa fa-heart likechecked">{post.like}</p>
              <p className="post-category"># {post.category}</p>
            </div>
            <Link
              to={`/deals/id/${post._id}`}
              className="btn btn-primary btn-lg"
            >
              Detail Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


{/* <div>
<div className="display-page">
  <h2>Deals</h2>
  {currentPosts.map((post, index) => (
    <div className="container-fluid" key={index}>
      <div className="post-card" key={post._id}>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <img
              src={post.imagelink}
              alt={post.title}
              className="post-card-img"
            />
          </div>
          <div className="col-md-9 text-center">
            <h3>{post.title}</h3>
            <p className="post-content">{post.description}</p>

            <div className="post-meta">
              <p className="fa fa-heart likechecked">{post.like}</p>
              <p className="post-category"># {post.category}</p>
            </div>
            <Link
              to={`/deals/id/${post._id}`}
              className="btn btn-primary btn-lg"
            >
              Detail Page
            </Link>
          </div>
        </div>
      </div>
    </div> */}