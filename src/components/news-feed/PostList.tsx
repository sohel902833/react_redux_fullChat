import PostItem from "./PostItem";

const PostList = () => {
  return (
    <div className="flex flex-col gap-5">
      {[...new Array(15)].map((item, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
};

export default PostList;
