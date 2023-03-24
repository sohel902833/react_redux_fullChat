import { Outlet } from "react-router-dom";
import ChatBootContainer from "../chat-boot/ChatBootContainer";
import Appbar from "./AppBar";
import LeftSideBar from "./LeftSideBar";
const NewsFeedLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(12,1fr)] box-border bg-slate-300">
      <nav className="col-span-full">
        <Appbar />
      </nav>
      {/* left sidebar  */}
      <div className="row-start-2 row-end-[-1] col-start-1 col-end-3">
        <LeftSideBar />
      </div>
      <div className="row-start-2 row-end-[-1] col-start-3 col-end-[-1] overflow-y-auto">
        <Outlet />
      </div>
      {/* place for small chat boot  */}
      <ChatBootContainer />
    </div>
  );
};

export default NewsFeedLayout;
