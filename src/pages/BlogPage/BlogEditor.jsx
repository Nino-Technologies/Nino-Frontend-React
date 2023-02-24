import React from "react";
import "./BlogEditor.scss";
import Nav from "./../../components/Nav/Nav";
import { TextField } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

function BlogEditor() {
  const [postContentPreview, setPostContentPreview] = React.useState(false);
  const [post, setPost] = React.useState({
    image_url: "",
    title: "",
    seo_url: "",
    sub_title: "",
    author: "63f793fcf1c9e97ee08e9d8f",
    tags: [],
    description: "",
    body: "",
  });
const { apiUrl } = React.useContext(UserContext);
  React.useEffect(() => {
    setPost((prev) => {
      return {
        ...prev,
        ["seo_url"]: post.title.replace(/ /g, "-"),
      };
    });
  }, [post.title]);

  const [imageFile, setImageFile] = React.useState(null);
  const [imagePrev, setImagePrev] = React.useState(null);
  function handleChange(e) {
    console.log(e.target.files);
    setImageFile(e.target.files[0]);
    setImagePrev(URL.createObjectURL(e.target.files[0]));
  }
  const handelChanges = (e) => {
    setPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  function uploadImageToCloudinary() {
    if (imageFile === "") return toast.info("No image selected");

    const imageData = new FormData();
    imageData.append("file", imageFile);
    imageData.append("upload_preset", "upload-blog-header-image");
    imageData.append("cloud_name", "dhvacnvek");

    fetch("https://api.cloudinary.com/v1_1/dhvacnvek/image/upload", {
      method: "post",
      body: imageData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // after the image is uploaded, publish blog post
        postBlogPost(data.url);
      })
      .catch((err) => console.log(err));
  }

  function postBlogPost(img_url) {
    const { title, seo_url, sub_title, author, tags, description, body } = post;
    let postObject = {
      image_url: img_url,
      title,
      seo_url,
      sub_title,
      author,
      tags,
      description,
      body,
    };
    // console.log(postObject);
    axios
      .post(`${apiUrl}/blog`, postObject)
      .then(function (response) {
        toast.success("blog post successfully")
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  return (
    <div className="BlogEditor">
      {/* <div className="nav-section"> */}
      <Nav />
      {/* </div> */}
      <div className="blog_ban-section">Welcome To Grinders Blog Editor</div>
      <div className="top-editor-container container">
        <div className="image-container">
          {!imagePrev ? (
            <div>
              <p>Upload Header Image</p>
              <input
                type="file"
                id="image_upload"
                className="d-none"
                onChange={handleChange}
                accept="image/*"
              />
              <label className="upload mx-auto" htmlFor="image_upload">
                Upload
              </label>
            </div>
          ) : (
            <>
              <div className="close_button" onClick={() => setImagePrev(null)}>
                <BsX />
              </div>
              <img src={imagePrev} />
            </>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Title"
              variant="outlined"
              name="title"
              value={post.title}
              onChange={(e) => {
                handelChanges(e);
              }}
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Subtitle"
              variant="outlined"
              name="sub_title"
              value={post.sub_title}
              onChange={(e) => {
                handelChanges(e);
              }}
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Author Name"
              variant="outlined"
              name="author"
              value={"Akpata Isaac Adeiza"}
              disabled={true}
              // onChange={(e) => {
              //   handelChanges(e);
              // }}
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Tag"
              variant="outlined"
              name="tags"
              // value={post.sub_title}
              onChange={(e) => {
                setPost((prev) => {
                  return {
                    ...prev,
                    [e.target.name]: e.target.value.split(","),
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={post.description}
          onChange={(e) => {
            handelChanges(e);
          }}
        ></textarea>
      </div>
      <div className="body-editor-container container">
        <div className="top my-5">
          <span>
            <b> Post Content </b>
            <button
              className="ms-3"
              onClick={() => setPostContentPreview(!postContentPreview)}
            >
              {postContentPreview ? "Edit Content" : "Preview Content"}
            </button>
          </span>

          <span>
            <b>Word Count: </b>
            {post.body.split(" ").length} Words,
            {post.body.length} latter's,
          </span>
        </div>
        {postContentPreview ? (
          <div className="edit_content-preview">
            <ReactMarkdown
              skipHtml={true}
              children={post.body}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[remarkGfm, remarkMath]}
            />
          </div>
        ) : (
          <textarea
            // value={postContent}
            // onChange={(e) => setPostContent(e.target.value)}
            name="body"
            value={post.body}
            onChange={(e) => {
              handelChanges(e);
            }}
          ></textarea>
        )}
        <div className="d-flex ms-auto mb-5 gap-3 mt-2">
          <button>Save Drift</button>
          <button onClick={() => uploadImageToCloudinary()}>
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogEditor;

/*
# i am a body from my mother home

<h1> hi header 1</h1>
<h2> this is header two </h2>

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

![test](https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png)

<img src="https://mma.prnewswire.com/media/1513369/Educative_Logo.jpg"  width="60%" height="30%">

  This ~is not~ strikethrough, but ~~this is~~!

The lift coefficient ($C_L$) is a dimensionless coefficient.

A paragraph with *emphasis* and **strong importance**.
import { UserContext } from './../../context/UserContext';

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

*/
