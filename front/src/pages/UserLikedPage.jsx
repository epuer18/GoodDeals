import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/userContext';
import { Link } from 'react-router-dom';

export function UserLikedPage () {
  const [likedDeals, setLikedDeals] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchLikedDeals = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/deals/userliked/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setLikedDeals(data);
          }
        } catch (error) {
          console.error("Error fetching liked deals:", error);
        }
      }
    };

    fetchLikedDeals();
  }, [user]);

return (
  <div>
    <div className="display-page">
      <h2>My Liked Deals:</h2>
      {likedDeals.length > 0 ?
      (likedDeals.map((post, index) => (
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
                <p className="fa fa-star likechecked"> Likes: {post.like}</p>
                <div className="post-meta">
                  <p className="post-category">Category: {post.category}</p>
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
      ))
      ) : (
          <h3>You have not liked any deals yet.</h3>
      )}

      {/* <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="prev"
        >
          Previous Page
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="next"
        >
          Next Page
        </button>
      </div> */}
    </div>
  </div>
);
}