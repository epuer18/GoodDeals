import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/user/userContext';
import { Link } from 'react-router-dom';

export function UserCreatedPage () {
  const [userDeals, setUserDeals] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDeals = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/deals/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setUserDeals(data);
          }
        } catch (error) {
          console.error("Error fetching user's deals:", error);
        }
      }
    };

    fetchUserDeals();
  }, [user]);

return (
  <div>
    <div className="display-page">
      <h2>My Created Deals:</h2>
      {userDeals.length > 0 ?
      (userDeals.map((post, index) => (
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
                <p className="fa fa-heart likechecked"> Likes: {post.like}</p>
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
          <h3>You have not created any deals yet.</h3>
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
