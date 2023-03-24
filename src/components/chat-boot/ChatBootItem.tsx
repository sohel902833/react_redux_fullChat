import { AiOutlineMinus, AiOutlineSend } from "react-icons/ai";
import { avatarImg } from "../../assets/assets";

const ChatBootItem = () => {
  return (
    <div className="h-full w-[400px] bg-white p-4 rounded-md relative">
      {/* chat boot header  */}
      <div className="flex items-center justify-between border-b-2 border-slate-300 pb-2">
        <div className="flex-[4] flex items-center gap-2">
          <img
            src={avatarImg}
            alt="profile image"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <h2 className="font-bold">Md Sohrab Hossain Sohel</h2>
        </div>
        <div className="flex-[1] flex items-center justify-end">
          <button className="bg-slate-200 rounded-full p-1">
            <AiOutlineMinus size={25} />
          </button>
        </div>
      </div>
      {/* main message container  */}
      <div className="h-full overflow-y-auto flex flex-col gap-4">
        {[...new Array(20)].map((item, index) => (
          <div
            key={index}
            className={`flex items-cener bg-red-400 max-w-[70%] py-2 px-2 rounded-sm w-fit rounded-md text-white font-bold ${
              index % 2 === 0 ? "self-end" : ""
            }`}
          >
            Hellow Message asdfasdf asdfasfdasdfasdfadsf
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
      </div>

      {/* input  */}
      <div className="absolute  bg-slate-200 bottom-0 left-0 right-0 flex items-center">
        <input
          className="flex-[4] bg-transparent px-4 py-4 outline-none w-full text-lg font-bold"
          type="text"
          placeholder="Aa"
        />
        <button className="flex-[1] flex items-center justify-end mr-1 bg-slate-200 rounded-full p-1">
          <AiOutlineSend size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatBootItem;
