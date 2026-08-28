import ReactMarkdown from "react-markdown";

export default function List({ block }) {
  const Tag = block.ordered ? "ol" : "ul";

  return (
    <Tag>
      {(block.items || []).map((item, index) => (
        <li key={index}>
          <ReactMarkdown>{item}</ReactMarkdown>
        </li>
      ))}
    </Tag>
  );
}
