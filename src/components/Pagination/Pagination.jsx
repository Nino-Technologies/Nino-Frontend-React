import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { BlogCardPost } from "../../pages/BlogPage/BlogPage";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Pagination.scss";

// Example items, to simulate fetching from another resources.
// const items = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
//   11, 12, 13, 14,
// ];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <ProfileCard artisan={item} key={item._id} />
          // <div>
          //   <h3>Item #{item}</h3>
          // </div>
        ))}
    </>
  );
}
function BlogCards({ currentItems }) {
  return (
    <div className="d-flex justify-content-evenly flex-wrap">
      {currentItems &&
        currentItems.map((post) => (
          <BlogCardPost post={post} key={post?._id} />
          // <div>
          //   <h3>Item #{item}</h3>
          // </div>
        ))}
    </div>
  );
}

export default function PaginatedItems({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset(0);
    handlePageClick({ selected: 0 });
  }, [items]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log("event", event);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <nav
        aria-label="Page navigation comments"
        className="pagination-nav mt-4"
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaArrowCircleRight />}
          onPageChange={handlePageClick}
          // pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<FaArrowCircleLeft />}
          renderOnZeroPageCount={null}
          // classNamea
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link icon"
          previousClassName="page-item prev-btn"
          previousLinkClassName="page-link"
          nextClassName="page-item next-btn"
          nextLinkClassName="page-link icon"
          activeClassName="active"
          // breakClassName=""
          // others

          // pageCount={20}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </nav>
    </>
  );
}
export function PaginatedBlog({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    setItemOffset(0);
    handlePageClick({ selected: 0 });
  }, [items]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log("event", event);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div className="PaginatedBlog">
      <BlogCards currentItems={currentItems} />
      <nav
        aria-label="Page navigation comments"
        className="pagination-nav mt-4"
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel={<FaArrowCircleRight />}
          onPageChange={handlePageClick}
          // pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<FaArrowCircleLeft />}
          renderOnZeroPageCount={null}
          // classNamea
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link icon"
          previousClassName="page-item prev-btn"
          previousLinkClassName="page-link"
          nextClassName="page-item next-btn"
          nextLinkClassName="page-link icon"
          activeClassName="active"
          // breakClassName=""
          // others

          // pageCount={20}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </nav>
    </div>
  );
}

// // Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById("container")
// );
