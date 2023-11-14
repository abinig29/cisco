import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export const Editor = ({ onChange, value }) => {
  const editorStyle = {
    backgroundColor: "white", // Set your desired background color
    height: "400px",
    paddingBottom: '40px' // Set a minimum height or adjust as needed
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      style={editorStyle}
      modules={modules}
      formats={formats}
    />
  );
};
