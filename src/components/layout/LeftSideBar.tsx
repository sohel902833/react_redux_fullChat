import { useNavigate } from "react-router-dom";
import { routes } from "./data";

const LeftSideBar = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };
  return (
    <div className="flex  gap-4 h-full w-full bg-white flex-col box-border p-4">
      {routes?.map((item) => (
        <div
          onClick={() => navigateTo(item?.path)}
          key={item?.id}
          className="cursor-pointer hover:bg-slate-300 p-4 rounded-md flex items-center"
        >
          {item?.icon(20, "black")}
          <p className="ml-3">{item?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftSideBar;
