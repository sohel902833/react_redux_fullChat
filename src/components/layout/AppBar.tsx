import { useNavigate } from "react-router-dom";
import { routes } from "./data";

const Appbar = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex items-center justify-between box-border h-full border-b-2 border-slate-400 shadow-sm bg-white">
      <div className="flex items-center pl-4 text-3xl font-extrabold text-purple-900">
        Sk
      </div>
      <div className="flex items-center justify-center gap-10">
        {routes?.map((item) => (
          <div
            onClick={() => navigateTo(item?.path)}
            key={item?.id}
            className="cursor-pointer hover:bg-slate-300 p-4 rounded-md"
          >
            {item?.icon(30, "black")}
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Appbar;
