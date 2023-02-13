import React from "react";
import "./BlogPage.scss";
import Nav from "./../../components/Nav/Nav";
import { TextField } from "@mui/material";
import adsImage from "../../assets/images/Grinders_Ads.svg";

function BlogPage() {
  return (
    <div className="BlogPage">
      <div className="nav-section">
        <Nav />
      </div>

      <div className="blog_ban-section">Welcome To Grinders Blog</div>

      <div className="container">
        <b className="header">Featured Post </b>
        <div className="featured_post-section">
          <FeaturedBlogCardPost />
          <FeaturedBlogCardPost />
        </div>
      </div>
      <div className="container-xl">
        <b className="header">Blog Post </b>
        <div className="row">
          <div className="col-md-9 col-12 post_cards-container">
            <BlogCardPost />
            <BlogCardPost />
            <BlogCardPost />
            <BlogCardPost />
            <BlogCardPost />
          </div>
          <div className="col-md-3 d-none d-md-flex">
            <SideCol />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

function BlogCardPost() {
  return (
    <div className="BlogCardPost">
      <div className="image-container">
        <img
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
          alt="test"
        />
      </div>
      <div className="text-container">
        <h2>Header Test</h2>
        <span>
          <span>
            <b>Author:</b> Victor Josiah
          </span>{" "}
          <span>
            <b>Date:</b> 12/feb/2020
          </span>
        </span>
        <p className="post_text_sub">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          nobis sapiente consectetur. Ullam accusamus optio iste doloremque,
          quae eos accusantium veritatis est, debitis numquam soluta voluptate
          dolorum iusto sequi molestias. Lorem ipsum dolor, sit amet consectetur
        </p>
        <button>Read more</button>
      </div>
    </div>
  );
}
function FeaturedBlogCardPost() {
  return (
    <div className="BlogCardPost FeaturedBlogCardPost">
      <div className="image-container">
        <img
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"
          alt="test"
        />
      </div>
      <div className="text-container">
        <h2>Header Test</h2>
        <span>
          <span>
            <b>Author:</b> Victor Josiah
          </span>{" "}
          <span>
            <b>Date:</b> 12/feb/2020
          </span>
        </span>
        <p className="post_text_sub">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
          nobis sapiente consectetur. Ullam accusamus optio iste doloremque,
          quae eos accusantium veritatis.
        </p>
        <button>Read more</button>
      </div>
    </div>
  );
}

function SideCol() {
  return (
    <div className="SideCol">
      <div className="search-container">
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search Post"
          variant="outlined"
        />
        <button>Search</button>
      </div>

      <div className="filter-container my-5 mt-2">
        <b>Filter</b>
      </div>
      <div className="read_more-container">
        <div className="header">READ MORE</div>

        <ul>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
          <li>Read more Blog Post</li>
        </ul>
      </div>

      <div className="ads_image-container mt-5">
        <img src={adsImage} alt="" />
      </div>
    </div>
  );
}
