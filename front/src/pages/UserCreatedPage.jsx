import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/user/userContext';
import { Pagination } from "../components/Pagination";
import { PostCard } from "../components/PostCard";
import "../asset/style/DisplayPage.css";

export function UserCreatedPage () {
  const [userDeals, setUserDeals] = useState([]);
  const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); 
  const [jumpToPageInput, setJumpToPageInput] = useState("");

  useEffect(() => {
    const fetchUserDeals = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/deals/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserDeals(data);
          }
        } catch (error) {
          console.error("Error fetching user's deals:", error);
        }
      }
    };

    fetchUserDeals();
  }, [user]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userDeals.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const jumpToPage = () => {
    const pageNumber = parseInt(jumpToPageInput, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(userDeals.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


return (
    <div>
      <div className="display-page">
        <h2>My Posted Deals:</h2>
        {currentPosts.length > 0 ?
          (currentPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))
          ) : (
          <h3>You have not created any deals yet.</h3>
        )}

        {userDeals.length > 0 && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={userDeals.length}
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

UserCreatedPage.propTypes = {};