import CreatePost from "../../components/news-feed/CreatePost";
import PostList from "../../components/news-feed/PostList";

const NewsFeed = () => {
  return (
    <div className="h-full w-ful gap-1 flex box-border">
      <div className="flex-[3] h-full bg-slate-300 p-4 box-border">
        <PostList />
      </div>
      <div className="flex-[1] h-full bg-slate-300 sm:hidden md:block">
        <CreatePost />
      </div>
    </div>
  );
};

export default NewsFeed;
