import { useState } from "react";
import CommentContainer from "./CommentContainer";

const Comments = ({ comments }: any) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = (open?: string) => {
    if (open) {
      setExpanded(open === "open" ? true : false);
      return;
    }
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <ul className="mt-2">
        {comments?.map((item: any, index: number) => (
          <CommentContainer
            key={index}
            item={item}
            expanded={expanded}
            handleExpand={handleExpand}
          />
        ))}
      </ul>
    </>
  );
};

export default Comments;
