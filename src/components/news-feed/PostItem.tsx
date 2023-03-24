import PostItemHeading from "./PostItemHeading";
import { useState } from "react";

import { BsFillHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import Comments from "./Comments";
import { comments } from "./comments";

const flowerImg = require("../../assets/images/flower.jpeg");
const PostItem = () => {
  const [enableComments, setEnableComments] = useState(false);

  const handleEnableComments = () => {
    setEnableComments((prev) => !prev);
  };
  return (
    <>
      <div className="bg-white p-4 rounded-md transition-all duration-[5s] delay-1000">
        <PostItemHeading />
        {/* post body  */}
        <div>
          <img
            className="w-full h-[400px] object-cover"
            src={flowerImg}
            alt="post images"
          />
        </div>
        <div className={`mt-2 border-t-2 border-slate-400 py-4`}>
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer">
              <BsFillHeartFill color="red" size={40} />
              <h2 className="text-lg font-bold">200K</h2>
            </div>
            <div
              onClick={handleEnableComments}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaRegCommentAlt size={40} />
              <h2 className="text-lg font-bold">200 Comments</h2>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <MdOutlineSaveAlt size={40} />
              <h2 className="text-lg font-bold">Save</h2>
            </div>
          </div>
        </div>
      </div>
      {enableComments && (
        <div className="bg-slate-300">
          <h2 className="pt-2 font-bold">Comments</h2>
          <Comments comments={comments} />
        </div>
      )}
    </>
  );
};

export default PostItem;
