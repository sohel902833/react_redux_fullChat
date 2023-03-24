import { SlOptions } from "react-icons/sl";
const avatarImg = require("../../assets/images/avatar.jpg");
const PostItemHeading = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={avatarImg}
            alt="profile_image"
          />
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">
              Md Sohrab Hossain Sohel Or User Name
            </h2>
            <p className="text-slate-600 text-sm">05-03-2002 at 05:36AM</p>
          </div>
        </div>
        <button className="bg-slate-200 p-4 rounded-full hover:bg-slate-100">
          <SlOptions />
        </button>
      </div>
      <hr className="mt-2" />
    </>
  );
};

export default PostItemHeading;
