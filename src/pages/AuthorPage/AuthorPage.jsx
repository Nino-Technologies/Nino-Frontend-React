import React, { useContext } from "react";
import "./AuthorPage.scss";
// import { TextField } from "@mui/material";
// import adsImage from "../../assets/images/Grinders_Ads.svg";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { SearchInputComponent, SideCol } from "../BlogPage/BlogPage.jsx";
import { BlogContext } from "../../context/BlogContext.jsx";
import { PaginatedBlog } from "../../components/Pagination/Pagination.jsx";

function AuthorPage() {
  const { blogPosts, getBlogPost, blogPostsSearch } = useContext(BlogContext);

  useEffect(() => {
    // console.log(blogPosts);
    getBlogPost();
    // console.log("NW", blogPosts);
  }, []);

  return (
    <div className="AuthorPage">
      <div className="search-container">
        <SearchInputComponent />
      </div>

      <div className="container-xl mt-5">
        <b className="header">Blog Post </b>
        <div className="post_cards-container">
          {blogPosts.loading ? (
            <>Loading...</>
          ) : (
            <>
              {!blogPostsSearch || blogPostsSearch.length ? (
                <PaginatedBlog itemsPerPage={6} items={blogPostsSearch} />
              ) : (
                <PaginatedBlog itemsPerPage={6} items={blogPosts.blogs} />
              )}
            </>
          )}
          {/* <PaginatedItems /> */}
          {/* {blogPosts?.blogs?.map((post) => {
                return <BlogCardPost post={post} key={post?._id} />;
              })} */}
        </div>
      </div>
    </div>
  );
}

export default AuthorPage;

export function AuthorBlogCardPost({ post }) {
  const { image_url, title, description, createdAt, author, seo_url } = post;

  // console.log(body.slice(0, 300));
  return (
    <div className="BlogCardPost">
      <div className="image-container">
        <img src={image_url ? image_url : ""} alt="" />
      </div>
      <div className="text-container mt-3">
        <h2>{title}</h2>
        <span className="d-flex flex-wrap">
          <span>
            <b>Author:</b>
            {author?.name}
          </span>{" "}
          <span>
            <b>Date:</b> {createdAt?.split("T")[0]}
          </span>
        </span>
        <div className="post_text_sub mt-2">
          <ReactMarkdown
            skipHtml={true}
            children={description.slice(0, 250)}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
          />
        </div>
        <Link to={`/blog/${seo_url}`} className="mt-auto mb-3">
          Read more
        </Link>
      </div>
    </div>
  );
}
