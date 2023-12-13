import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import "../asset/style/DisplayPage.css";

export function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [jumpToPageInput, setJumpToPageInput] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/deals`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.deals);
        } else {
          console.error("Failed to fetch data from the backend");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    fetchPosts();
  }, []);
  
  const sortedPosts = posts.sort((a, b) => b.like - a.like);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const jumpToPage = () => {
    const pageNumber = parseInt(jumpToPageInput, 10);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div>
      <div className="display-page">
        <h2>Deals</h2>
        {currentPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}

<Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                jumpToPage={jumpToPage}
                jumpToPageInput={jumpToPageInput}
                setJumpToPageInput={setJumpToPageInput}
            />

      </div>
    </div>
  );
}

HomePage.propTypes = {};
