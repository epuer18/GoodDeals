import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/user/userContext';
import { Pagination } from "../components/Pagination";
import { PostCard } from "../components/PostCard";

import "../asset/style/UserLikedPage.css";

export function UserLikedPage () {
  const [likedDeals, setLikedDeals] = useState([]);
  const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [jumpToPageInput, setJumpToPageInput] = useState("");

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = likedDeals.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const jumpToPage = () => {
    const pageNumber = parseInt(jumpToPageInput, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(likedDeals.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


return (
  <div>
    <div className="display-page">
      <h2>My Liked Deals:</h2>
      {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
      ) : (
          <h3>You have not liked any deals yet.</h3>
      )}

     {likedDeals.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={likedDeals.length}
          paginate={paginate}
          currentPage={currentPage}
          jumpToPage={jumpToPage}
          jumpToPageInput={jumpToPageInput}
          setJumpToPageInput={setJumpToPageInput}
        />
      )}

    </div>
  </div>
);
}
