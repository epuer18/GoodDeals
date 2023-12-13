import PropTypes from 'prop-types';
import React from 'react';

export function Pagination ({ postsPerPage, totalPosts, paginate, currentPage, jumpToPage, jumpToPageInput, setJumpToPageInput }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleJumpToPage = () => {
        jumpToPage();
    };

    return (
        <div className="pagination">
            <div className="prev">
                {currentPage !== 1 && (
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous Page
                    </button>
                )}
            </div>
            <div className="pagejump">
                <p>{pageNumbers.length} pages, now in {currentPage} page</p>
                <input
                    type="number"
                    min="1"
                    max={pageNumbers.length}
                    placeholder="1"
                    value={jumpToPageInput}
                    onChange={(e) => setJumpToPageInput(e.target.value)}
                />
                <button onClick={handleJumpToPage}>Jump</button>
            </div>
            <div className="next">
                {currentPage !== pageNumbers.length && (
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
                        Next Page
                    </button>
                )}
            </div>
        </div>
    );
};


        {/* <div className="pagination">
          <div className="prev">
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="prev"
          >
            Previous Page
          </button>
        )}
        </div>
        <div className="pagejump">
        <p>1-{Math.ceil(posts.length / postsPerPage)} pages, now in {currentPage} page</p>
            <input
              type="number"
              min="1"
              max={Math.ceil(posts.length / postsPerPage)}
              placeholder="1"
              value={jumpToPageInput}
              onChange={(e) => setJumpToPageInput(e.target.value)}
            />
            <button onClick={jumpToPage}>Jump</button>
            
          </div>
        <div className="next">
        {currentPage !== Math.ceil(posts.length / postsPerPage) && (
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
            className="next"
          >
            Next Page
          </button>
        )}
        </div>

        </div> */}