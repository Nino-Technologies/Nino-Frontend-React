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

function BlogEditor() {
  const [postContentPreview, setPostContentPreview] = React.useState(false);
  const [postContent, setPostContent] = React.useState("");
  return (
    <div className="BlogEditor">
      {/* <div className="nav-section"> */}
      <Nav />
      {/* </div> */}
      <div className="blog_ban-section">Welcome To Grinders Blog Editor</div>
      <div className="top-editor-container container">
        <div className="image-container">
          <div>
            <p>Upload Header Image</p>
            <button>Upload</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Title"
              variant="outlined"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Subtitle"
              variant="outlined"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Author Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Blog Tag"
              variant="outlined"
            />
          </div>
        </div>
      </div>

      <div className="body-editor-container container">
        <div className="top my-5">
          <span>
            <b> Post Content </b>
            <button onClick={() => setPostContentPreview(!postContentPreview)}>
              {postContentPreview ? "Edit Content" : "Preview Content"}
            </button>
          </span>

          <span>
            <b>Word Count: </b>
            {postContent.split(" ").length} Words,
            {postContent.length} latter's,
          </span>
        </div>
        {postContentPreview ? (
          <div className="edit_content-preview">
            <ReactMarkdown
              skipHtml={true}
              children={postContent}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              remarkPlugins={[remarkGfm, remarkMath]}
            />
          </div>
        ) : (
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        )}
        <div className="d-flex ms-auto">
          <button>Save Drift</button>
          <button>Publish Post</button>
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
  This ~is not~ strikethrough, but ~~this is~~!

The lift coefficient ($C_L$) is a dimensionless coefficient.

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

*/
