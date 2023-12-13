import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from "../components/Pagination";
import { PostCard } from "../components/PostCard";

import "../asset/style/SearchPage.css";

export function SearchPage (){
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [jumpToPageInput, setJumpToPageInput] = useState("");

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const searchTerm = query.get('query');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/deals`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.deals);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = searchTerm
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    filteredPosts.sort((a, b) => b.like - a.like);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const jumpToPage = () => {
      const pageNumber = parseInt(jumpToPageInput, 10);
      if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredPosts.length / postsPerPage)) {
        setCurrentPage(pageNumber);
      }
    };



  return (
        <div>
          <div className="display-page">
            <h2>Search Results for: {searchTerm}</h2>
            {currentPosts.length > 0 ? 
            (currentPosts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))
            ) : (
                <h3 className="searchresult">No results found.</h3>
            )}

            {filteredPosts.length > 0 && (
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredPosts.length}
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