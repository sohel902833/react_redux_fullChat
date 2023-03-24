import { useState } from "react";
import { BsFillImageFill, BsCameraVideo } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
const AddMeDonor = () => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <div className="bg-white px-4 py-2 mt-4 rounded-md">
      <div className="flex items-center justify-between py-2">
        <h2 className="font-bold text-lg">Add Donor</h2>
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
            placeholder="Name"
            className="outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            className="mt-2 outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full"
          />
          <input
            type="date"
            placeholder="Last Donate"
            className="mt-2 outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full"
          />
          <textarea
            placeholder="Adress"
            className="resize-none outline-none bg-slate-200 rounded-md px-4 py-3 font-bold text-black w-full mt-4"
            rows={4}
          />
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

export default AddMeDonor;
