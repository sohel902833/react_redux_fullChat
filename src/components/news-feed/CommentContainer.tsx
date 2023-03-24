import { useState } from "react";
import { avatarImg } from "../../assets/assets";
import Comments from "./Comments";

const CommentContainer = ({ item, expanded, handleExpand }: any) => {
  const [newComment, setNewComment] = useState(false);
  const handleSetNewComment = () => {
    handleExpand("open");
    setNewComment((prev) => !prev);
  };

  console.log({ expanded });

  return (
    <li
      className=" 
     last:after:hidden
      relative before:absolute before:content-[''] before:left-[0px] before:top-[20px] before:w-[63px] before:h-[2em] before:border-b-2 before:border-slate-500 before:border-l-2 before:rounded-bl-[30px] after:absolute after:content-[''] after:left-[0px] after:bottom-[-21px] after:border-l-2 after:border-slate-500 after:w-[8px] after:h-[calc(100%+26px)]"
    >
      <details className="pl-7  rounded-md p-2  relative" open={expanded}>
        <summary
          className=" bg-white p-2 rounded-md marker:hidden list-none flex flex-col cursor-pointer  z-[99]"
          //   onClick={handleExpand}
        >
          <div className="flex gap-1">
            <img
              className="h-[45px] w-[45px] object-cover"
              src={avatarImg}
              alt="user_image"
            />
            <div className="flex flex-col">
              <h3 className="font-[400]">Md Sohrab Hossain Sohel</h3>
              <p className="text-sm">05-03-2002 at asdf</p>
            </div>
          </div>
          <p className="ml-10 text-md font-semibold"> {item?.text}</p>
          <div className="flex items-center mt-2 gap-4">
            {item?.childComments?.length > 0 && (
              <button
                onClick={() => handleExpand()}
                className="font-bold text-md"
              >
                {expanded ? "View Less" : "View More"}
              </button>
            )}
            <button className="font-bold text-md">Like</button>
            <button className="font-bold text-md" onClick={handleSetNewComment}>
              Comment
            </button>
          </div>
        </summary>
        {newComment && (
          <div className="flex items-center gap-2 bg-red mt-4 border-2 rounded-md border-slate-600 px-4">
            <input
              className="flex-[5] h-full w-full py-4 outline-none bg-transparent"
              placeholder="Comment"
              type="text"
            />
            <button className="bg-purple-900 px-4 flex-[1] p-1 rounded-md text-white hover:bg-purple-600">
              Comment
            </button>
          </div>
        )}
        {item?.childComments?.length > 0 && (
          <Comments comments={item?.childComments} />
        )}
      </details>
    </li>
  );
};

export default CommentContainer;
