import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//modules and formats for react quill
let modules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["link", "image"],
    [
      {
        color: [],
      },
      {
        background: [],
      },
    ], // dropdown with defaults from theme
    [
      {
        font: [],
      },
    ],
    [
      {
        align: [],
      },
    ],
    ["clean"],
  ],
};

let formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function Quill({ value, handleChange }) {
  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Quill;
