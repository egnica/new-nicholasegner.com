import React from "react";
import Text from "./blocks/Text";
import ImageP from "./blocks/Image";
import Video from "./blocks/Video";
import Code from "./blocks/Code";
import List from "./blocks/List";
import Heading from "./blocks/Heading";
import {
  Quote,
  Callout,
  Embed,
  LinkBlock,
} from "./blocks/Extras";

function ContentBlock({ content }) {
  if (!Array.isArray(content)) return null;

  return content.map((item, index) => {
    switch (item.type) {
      case "paragraph":
      case "text":
        return <Text key={index} block={item} />;

      case "heading":
        return <Heading key={index} block={item} />;

      case "image":
        return <ImageP key={index} block={item} />;

      case "video":
        return <Video key={index} block={item} />;

      case "code":
        return <Code key={index} block={item} />;

      case "list":
      case "ul":
        return <List key={index} block={item} />;

      case "quote":
        return <Quote key={index} block={item} />;

      case "callout":
        return <Callout key={index} block={item} />;

      case "embed":
        return <Embed key={index} block={item} />;

      case "link":
        return <LinkBlock key={index} block={item} />;

      default:
        return null;
    }
  });
}

export default ContentBlock;
