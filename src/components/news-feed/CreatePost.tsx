import { useState } from "react";
import { BsFillImageFill, BsCameraVideo } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
const CreatePost = () => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <div className="bg-white px-4 py-2 mt-4 rounded-md">
      <div className="flex items-center justify-between py-2">
        <h2 className="font-bold text-lg">Create Post</h2>
        <button
          onClick={handleExpand}
          className="bg-slate-200 rounded-full p-2"
        >
          <MdAdd size={25} />
        </button>
      </div>
      {expand && (
        <>
          <input
            type="text"
            placeholder="Title"
            className="outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full"
          />
          <textarea
            placeholder="Descriptioni"
            className="resize-none outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full mt-4"
            rows={4}
          />
          <div className="flex items-center mt-2 mb-2 gap-2 justify-center">
            <label
              htmlFor="postImageInput"
              className="cursor-pointer flex items-center gap-2 border-2 border-blue-300 px-2 py-2 rounded-md"
            >
              <input
                id="postImageInput"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
              />
              <BsFillImageFill size={24} color="blue" />
              <span>Choose Image</span>
            </label>
            <label
              htmlFor="postVideoInput"
              className="cursor-pointer flex items-center gap-2 border-2 border-blue-300 px-2 py-2 rounded-md"
            >
              <input
                id="postVideoInput"
                type="file"
                accept="video"
                className="hidden"
              />
              <BsCameraVideo size={24} color="blue" />
              <span>Choose Video</span>
            </label>
          </div>
          <div className="flex items-center justify-end mt-5">
            <button className="bg-purple-900 text-white px-4 py-2 rounded-md ">
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;
