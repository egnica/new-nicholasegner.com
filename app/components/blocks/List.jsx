import React from "react";
import ReactMarkdown from "react-markdown";
function List({ block }) {
  return (
    <ul>
      {block.items.map((item, index) => (
        <li key={index}>
          <ReactMarkdown>{item}</ReactMarkdown>
        </li>
      ))}
    </ul>
  );
}

export default List;
