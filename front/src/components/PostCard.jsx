import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

PostCard.propTypes = {
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imagelink: PropTypes.string.isRequired,
      like: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired
  };

