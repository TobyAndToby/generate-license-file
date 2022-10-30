import Tag from "@site/src/components/Tag";
import React from "react";

interface Props {
  isAsync: boolean;
}

const MethodTags = ({ isAsync }: Props) => {
  return <span>{isAsync && <Tag full>Async</Tag>}</span>;
};
export default MethodTags;
