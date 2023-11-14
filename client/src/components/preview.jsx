import "react-quill/dist/quill.bubble.css";

import ReactQuill from "react-quill";

export const Preview = ({ value }) => {
  return <ReactQuill theme="bubble" value={value} readOnly  style={{ width: "100%" }} />;
};
