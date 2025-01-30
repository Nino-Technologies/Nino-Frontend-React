import React, { useContext } from "react";
import "./BlogPage.scss";
import Nav from "./../../components/Nav/Nav.jsx";
import { TextField } from "@mui/material";
import adsImage from "../../assets/images/Grinders_Ads.svg";
import { BlogContext } from "./../../context/BlogContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { PaginatedBlog } from "../../components/Pagination/Pagination.jsx";
import { UserContext } from "./../../context/UserContext.jsx";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

function BlogPage() {
  const { blogPosts, getBlogPost, blogPostsSearch } = useContext(BlogContext);

  useEffect(() => {
    getBlogPost();
  }, []);
  // console.log(blogPost);
  return (
    <div className="BlogPage">
      <div className="nav-section">
        <Nav />
      </div>

      <div className="blog_ban-section">Welcome To Grinders Blog</div>

      {/* <div className="container">
        <b className="header">Featured Post </b>
        <div className="featured_post-section">
          <FeaturedPostComponent />
        </div>
      </div> */}
      <div className="container-xl mt-5">
        <b className="header">Blog Post </b>
        <div className="row">
          <div className="col-md-9 col-12">
            <div className="mobile-search d-block d-md-none">
              <SearchInputComponent />
            </div>
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
          <div className="col-md-3 d-none d-md-flex">
            <SideCol search={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

export function BlogCardPost({ post }) {
  const { userProfile } = useContext(UserContext);
  const { deleteBlogPost } = useContext(BlogContext);
  const { image_url, title, description, createdAt, author, seo_url } = post;
  // console.log("userProfile", userProfile);
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
        {userProfile && userProfile.role === -1 ? (
          <div className="d-flex gap-2 flex-wrap   ">
            <Link
              to={`/blog/${seo_url}`}
              className="btn btn-secondary d-flex align-items-center gap-1 "
            >
              <FaEye /> Read
            </Link>
            <Link
              to={`/dashboard/editor?id=${seo_url}`}
              className="btn btn-secondary d-flex align-items-center gap-1 "
            >
              <FaEdit /> Edit
            </Link>
            <button
              onClick={() => {
                deleteBlogPost(post._id);
              }}
              className="btn btn-danger   d-flex align-items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ) : (
          <Link to={`/blog/${seo_url}`} className="mt-auto mb-3">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
}
export function FeaturedBlogCardPost({ post }) {
  // const { image_url, title, description, createdAt, author, seo_url } = post;

  // console.log(post);
  return (
    <div className="BlogCardPost FeaturedBlogCardPost">
      <div className="image-container">
        <img src={post?.image_url} alt="" />
      </div>
      <div className="text-container">
        <h2>{post?.title}</h2>
        <span className="d-flex flex-wrap">
          <span>
            <b>Author:</b>
            {post?.author?.name}
          </span>{" "}
          <span>
            <b>Date: </b> {post?.createdAt?.split("T")[0]}
          </span>
        </span>
        <div className="post_text_sub mt-2">
          <ReactMarkdown
            skipHtml={true}
            children={post?.description?.slice(0, 100) + "..."}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
          />
        </div>
        <Link to={`/blog/${post?.seo_url}`}>Read more</Link>
      </div>
    </div>
  );
}

export function SideCol({ search }) {
  const { blogPosts } = useContext(BlogContext);
  return (
    <div className="SideCol">
      {search ? (
        <>
          {" "}
          <SearchInputComponent />
          <div className="filter-container my-5 mt-2">
            <b>Filter</b>
          </div>
        </>
      ) : null}
      <div className="read_more-container">
        <div className="header ps-2">READ MORE</div>

        <ul>
          {blogPosts?.blogs?.map(function (blogPost, i) {
            if (i >= 4) return null;
            return (
              <li key={i}>
                <Link to={`/blog/${blogPost?.seo_url}`}>{blogPost?.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="ads_image-container mt-5">
        <img src={adsImage} alt="" />
      </div>
    </div>
  );
}

export function SearchInputComponent() {
  const { searchBlogPost, blogPostsSearch } = useContext(BlogContext);
  const [searchText, setSearchText] = React.useState("");
  return (
    <div className="search-container">
      {(!blogPostsSearch || blogPostsSearch.length === 0) && searchText !== ""
        ? ` No Blog Found With "${searchText}" Keyword`
        : null}
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search Post"
        className="mt-2"
        variant="outlined"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          searchBlogPost(e.target.value);
        }}
      />
      {/* <button>Search</button> */}
    </div>
  );
}

export function FeaturedPostComponent() {
  const { blogPosts } = useContext(BlogContext);

  return (
    <>
      <FeaturedBlogCardPost
        post={blogPosts?.blogs[blogPosts?.blogs?.length - 1]}
      />
      <FeaturedBlogCardPost
        post={blogPosts?.blogs[blogPosts?.blogs?.length - 2]}
      />
    </>
  );
}
