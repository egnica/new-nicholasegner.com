import React from "react";

function Heading({ block }) {
  switch (block.level) {
    case 1:
      return <h1>{block.text}</h1>;

    case 2:
      return <h2>{block.text}</h2>;

    case 3:
      return <h3>{block.text}</h3>;

    case 4:
      return <h4>{block.text}</h4>;

    case 5:
      return <h5>{block.text}</h5>;

    default:
      return <h2>{block.text}</h2>;
  }
}

export default Heading;
